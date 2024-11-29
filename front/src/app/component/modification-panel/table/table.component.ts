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
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
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
				name: [planet.name],
				description: [planet.description],
				diameter: [planet.diameter],
				distance_from_sun: [planet.distance_from_sun],
			})
		);

		const table_array = this.fb.array(rows);
		this.form.setControl('table', table_array);
    }

	get table()
	{
		return this.form.get('table') as FormArray;
	}

	updateValue(row_index: number, control_name: string, $event: Event) {
		const value = ($event.target as HTMLElement).textContent?.trim();
		if (value !== undefined)
		{
			const current_changes = this.temporary_changes.get(row_index) || {};
			current_changes[control_name] = value;
			this.temporary_changes.set(row_index, current_changes);
		}
	}

	onSubmit(): void
	{
		this.temporary_changes.forEach((changes: any, planet_id: number) =>
		{
			console.log(planet_id, changes);
			this.planetService.patchPlanet(planet_id + 1, changes).subscribe((data) =>
			{
				console.log(data);
			})
		})
	}
}
