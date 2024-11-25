import { Injectable } from '@angular/core';
import {Planet} from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
	private planets_data!: Planet[];

	constructor() {
		this.planets_data = [
			new Planet("Neptune", 49244, 0,
				"",
				"/assets/image/planets/neptune.png",
				[]),
			new Planet("Uranus", 50724, 0,
				"",
				"/assets/image/planets/uranus.png",
				[]),
			new Planet("Saturn", 116460, 0,
				"",
				"/assets/image/planets/saturn.png",
				[]),
			new Planet("Jupiter", 139820, 149.6,
				"Jupiter, the largest planet in our Solar System, is a swirling giant of gas with a prominent Great Red Spot, a storm larger than Earth itself.",
				"/assets/image/planets/jupiter.png",
				[]),
			new Planet("Mars", 6779, 0,
				"",
				"/assets/image/planets/mars.png",
				[]),
			new Planet("Earth", 12742, 0,
				"",
				"/assets/image/planets/earth.png",
				[]),
			new Planet("Venus", 12104, 0,
				"",
				"/assets/image/planets/venus.png",
				[]),
			new Planet("Mercury", 4879, 0,
				"",
				"/assets/image/planets/mercury.png",
				[]),

		]
	}

	getPlanets(): Planet[]
	{
		return this.planets_data;
	}

	getSmallestPlanet(): Planet
	{
		let planet: Planet = this.planets_data[0]
		for (const p of this.planets_data)
		{
			if (p.diameter < planet.diameter)
				planet = p;
		}
		return (planet);
	}
	getBiggestPlanet(): Planet
	{
		let planet: Planet = this.planets_data[0]
		for (const p of this.planets_data)
		{
			if (p.diameter > planet.diameter)
				planet = p;
		}
		return (planet);
	}
}
