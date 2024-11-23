import { Moon } from "./moon";

export class Planet
{
	constructor(public name: string,
				public diameter: number,
				public distance_from_sun: number,
				public description: string,
				public image: string,
				public moons: Array<Moon>) {}
}