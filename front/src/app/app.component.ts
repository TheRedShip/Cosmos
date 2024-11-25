import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PlanetDescriptorComponent} from './planet-descriptor/planet-descriptor.component';
import { Planet } from './models/planet';
import {PlanetService} from './planet-service/planet.service';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	private title:string = "Cosmos";

	ngOnInit(): void {
	}

	@HostListener('window:wheel', ['$event'])
	onWindowScroll(e: WheelEvent): void
	{
		const scroll = e.deltaY > 0 ? 1 : -1;
	}
}
