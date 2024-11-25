import {Component, OnInit} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../../models/planet';
import {PlanetService} from '../../planet-service/planet.service';

@Component({
  selector: 'app-all-planets',
  imports: [ PlanetOrbitComponent ],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent implements OnInit {
	public planets!: Planet[];
	public orbit_size: number[] = [
		3800,
		3400,
		3000,
		2600,
		2200,
		1800,
		1400,
		1050,
	];

	constructor(private planetService: PlanetService) {}

	ngOnInit(): void {
		this.planets = this.planetService.getPlanets();
    }
}
