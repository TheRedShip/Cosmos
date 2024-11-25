import {Component, OnInit} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../models/planet';
import {PlanetService} from '../planet-service/planet.service';

@Component({
  selector: 'app-all-planets',
  imports: [ PlanetOrbitComponent ],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent implements OnInit {
	public planets!: Planet[];
	public orbit_size: number[] = [
		3750,
		3350,
		2950,
		2550,
		2150,
		1750,
		1350,
		950
	];

	constructor(private planetService: PlanetService) {}

	ngOnInit(): void {
		this.planets = this.planetService.getPlanets();
    }
}
