import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-planet-statistic',
	imports: [],
	templateUrl: './planet-statistic.component.html',
	styleUrl: './planet-statistic.component.css'
})
export class PlanetStatisticComponent {
	@Input() property!: string;
	@Input() value!: number | string;
}
