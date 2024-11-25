import {Component, Host, HostListener, Input, OnInit} from '@angular/core';
import { PlanetStatisticComponent } from '../planet-statistic/planet-statistic.component';
import { Planet } from '../../models/planet';
import {ActivatedRoute} from '@angular/router';
import {PlanetService} from '../../planet-service/planet.service';

@Component({
	selector: 'app-planet-descriptor',
	imports: [
		PlanetStatisticComponent
	],
	templateUrl: './planet-descriptor.component.html',
	styleUrl: './planet-descriptor.component.css'
})
export class PlanetDescriptorComponent implements OnInit {
	@Input() planet!: Planet;

	constructor(private route: ActivatedRoute, private planetService: PlanetService) {}

    ngOnInit(): void {
		this.route.params.subscribe(params =>
		{
			this.planet = this.planetService.getPlanets()[params["id"]];
		})
    }
}
