import { Moon } from "./moon";
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Planet
{
	constructor(public id: number,
				public name: string,
				public diameter: number,
				public distance_from_sun: number,
				public description: string,
				public image: string,
				public moons: Array<Moon>) {
	}

	static asFormGroup(planet: Planet): FormGroup
	{
		return new FormGroup({
			id: new FormControl(planet.id, Validators.required),
			name: new FormControl(planet.name, Validators.required),
			diameter: new FormControl(planet.diameter, Validators.required),
			distance_from_sun: new FormControl(planet.distance_from_sun, Validators.required),
			description: new FormControl(planet.description, Validators.required),
		})
	};
}
