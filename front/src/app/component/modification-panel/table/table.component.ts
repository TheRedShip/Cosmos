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
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanetService} from '../../../service/planet-service/planet.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
	selector: 'app-table',
	imports: [
		ReactiveFormsModule,
		NgForOf,
		NgIf
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit {
	@Input() planets!: Planet[];
	@ViewChild("table_front") table_front!: ElementRef;

	form!: FormGroup;

	constructor(private fb: FormBuilder, private planetService: PlanetService)
	{

	}

	get rows(): FormArray
	{
		return this.form.get("rows") as FormArray;
	}

	ngOnInit(): void
	{
		this.form = this.fb.group({
			rows: this.fb.array([]),
		})

		this.planetService.getPlanets().subscribe(planets =>
		{
			planets.forEach((planet) => this.addRow(planet));
		})
	}

	addRow(planet: Planet): void
	{
		const row = this.fb.group({
			id: [planet.id, []],
			name: [planet.name, []],
			diameter: [planet.diameter, []],
			distance_from_sun: [planet.distance_from_sun, []],
			description: [planet.description, []],
		})
		this.rows.push(row);
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

	onSubmit(): void
	{
		if (this.form.valid)
		{
			
		}
	}

	new_table_entry()
	{
		const new_planet: Planet = new Planet(this.rows.controls.length + 1,
												"Planet", 10000, 1,
												"Planet description", "", []);
		this.addRow(new_planet);
	}
}
