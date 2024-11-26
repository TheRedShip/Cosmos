import {Component, Host, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlanetStatisticComponent} from '../planet-statistic/planet-statistic.component';
import {Planet} from '../../models/planet';
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
	public planet!: Planet;

	@HostListener('window:wheel', ['$event'])
	onWindowScroll($event: any)
	{
		console.log($event);
	}

    ngOnInit(): void {
    }
}
