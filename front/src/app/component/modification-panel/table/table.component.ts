import {
	AfterViewChecked,
	AfterViewInit,
	Component,
	ElementRef,
	Input, OnChanges, OnInit,
	QueryList,
	SimpleChanges,
	ViewChild,
	ViewChildren
} from '@angular/core';
import {Planet} from '../../../models/planet';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanetService} from '../../../service/planet-service/planet.service';

@Component({
	selector: 'app-table',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnChanges {
	@Input() planets!: Planet[];
	@ViewChild("table_front") table_front!: ElementRef;

	form: FormGroup;
	temporary_changes: Map<number, any> = new Map();

	constructor(private fb: FormBuilder, private planetService: PlanetService)
	{
		this.form = this.fb.group({
			table: this.fb.array([])
		});
	}

	ngAfterViewInit(): void {
		this.table_front.nativeElement.addEventListener("keydown", (event: any) =>
		{
			const cell = event.target;

			if (cell.classList.contains("editable"))
			{
				if (event.key == "Enter")
				{
					event.preventDefault();
					cell.blur();
				}
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.planets)
		{
			this.planets.sort((a, b) => a.id - b.id);
			this.updateFormArray();
		}
    }

	private updateFormArray(): void {
		const rows = this.planets.map((planet) =>
			this.fb.group({
				id: [planet.id],
				name: [planet.name, [Validators.required, Validators.minLength(1)]],
				description: [planet.description, Validators.maxLength(200)],
				diameter: [
					planet.diameter,
					[Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
				],
				distance_from_sun: [
					planet.distance_from_sun,
					[Validators.required, Validators.min(0.1), Validators.pattern(/^\d+(\.\d+)?$/)]],
			})
		);

		const table_array = this.fb.array(rows);
		this.form.setControl('table', table_array);
    }

	get table()
	{
		return this.form.get('table') as FormArray;
	}

	updateValue(row_index: number, control_name: string, $event: Event)
	{
		const td_element = $event.target as HTMLElement;

		const span_element = td_element.textContent?.trim();
		const unit_span = td_element.querySelector('span')
		const unit = unit_span?.textContent?.trim() || '';

		const value = span_element?.replace(unit, '').trim();

		if (value !== undefined)
		{
			const current_changes = this.temporary_changes.get(row_index) || {};
			current_changes[control_name] = value;
			this.temporary_changes.set(row_index, current_changes);
		}
	}

	onSubmit(): void
	{
		if (this.form.valid)
		{
			this.temporary_changes.forEach((changes: any, planet_id: number) => {
				if (!this.planets.map(planet => planet.id).includes(planet_id + 1)) {
					this.planetService.postPlanet(changes).subscribe((data) => {})
					this.planets.push(changes);
				}
				else
					this.planetService.patchPlanet(planet_id + 1, changes).subscribe((data) => {})
			})
		}
		this.temporary_changes.clear();
	}

	new_table_entry()
	{
		const new_rod_id = this.table.controls.length + 1; //to change

		const new_row = this.fb.group({
			id: [new_rod_id],
			name: [''],
			description: [''],
			diameter: [0],
			distance_from_sun: [0],
		})

		const changes: any = {};
		for (let change of Object.keys(new_row.value))
			changes[change] = new_row.get(change)?.value;

		this.temporary_changes.set(new_rod_id - 1, changes);
		this.table.push(new_row);
	}
}
