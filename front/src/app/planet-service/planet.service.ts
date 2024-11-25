import { Injectable } from '@angular/core';
import {Planet} from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
	private planets_data!: Planet[];

	constructor() {
		this.planets_data = [
			new Planet("Neptune", 0, 0,
				"",
				"/assets/image/planets/neptune.png",
				[]),
			new Planet("Uranus", 0, 0,
				"",
				"/assets/image/planets/uranus.png",
				[]),
			new Planet("Saturn", 0, 0,
				"",
				"/assets/image/planets/saturn.png",
				[]),
			new Planet("Jupiter", 12756, 149.6,
				"Jupiter, the largest planet in our Solar System, is a swirling giant of gas with a prominent Great Red Spot, a storm larger than Earth itself.",
				"/assets/image/planets/jupiter.png",
				[]),
			new Planet("Mars", 0, 0,
				"",
				"/assets/image/planets/mars.png",
				[]),
			new Planet("Earth", 0, 0,
				"",
				"/assets/image/planets/earth.png",
				[]),
			new Planet("Venus", 0, 0,
				"",
				"/assets/image/planets/venus.png",
				[]),
			new Planet("Mercury", 0, 0,
				"",
				"/assets/image/planets/mercury.png",
				[])
		]
	}

	getPlanets(): Planet[]
	{
		return this.planets_data;
	}
}
