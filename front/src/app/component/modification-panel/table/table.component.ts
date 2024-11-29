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
	modified_rows: Set<number> = new Set();

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			table: this.fb.array([])
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.planets)
		{
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

	onSubmit(): void
	{
		const modified_data = this.table.controls
			.filter((_, index) => this.modified_rows.has(index))
			.map((control) => control.value);

		console.log(modified_data);
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

	updateValue(row_index: number, control_name: string, $event: Event) {
		const value = ($event.target as HTMLElement).textContent?.trim();
		if (value !== undefined)
		{
			console.log(row_index, control_name);
			this.table.at(row_index).get(control_name)?.setValue(value);
			this.modified_rows.add(row_index);
		}
	}
}
