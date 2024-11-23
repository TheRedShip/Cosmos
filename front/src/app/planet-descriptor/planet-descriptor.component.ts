import { Component, Host, HostListener, Input } from '@angular/core';
import { PlanetStatisticComponent } from '../planet-statistic/planet-statistic.component';
import { Planet } from '../models/planet';

@Component({
	selector: 'app-planet-descriptor',
	imports: [
		PlanetStatisticComponent
	],
	templateUrl: './planet-descriptor.component.html',
	styleUrl: './planet-descriptor.component.css'
})
export class PlanetDescriptorComponent {
	@Input() planet!: Planet;
}
