import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColortitleComponent} from './colortitle/colortitle.component';
import {Colortitle} from './models/colortitle';
import {PlanetDescriptorComponent} from './planet-descriptor/planet-descriptor.component';
import { Planet } from './models/planet';

@Component({
	selector: 'app-root',
	imports: [
		PlanetDescriptorComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	private title:string = "Cosmos";
	public planet!: Planet;

	ngOnInit(): void {
		this.planet = new Planet("Jupiter", 12756, 149.6,
														"Jupiter, the largest planet in our Solar System, is a swirling giant of gas with a prominent Great Red Spot, a storm larger than Earth itself.",
														"/assets/image/planets/jupiter.png",
														[]);
	}

	@HostListener('window:wheel', ['$event'])
	onWindowScroll(e: WheelEvent): void
	{
		const scroll = e.deltaY > 0 ? 1 : -1;
	}
}
