import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PlanetDescriptorComponent} from './component/planet-descriptor/planet-descriptor.component';
import { Planet } from './models/planet';
import {PlanetService} from './service/planet-service/planet.service';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	public title:string = "Cosmos";

	ngOnInit(): void {
	}

}
