import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColortitleComponent} from './colortitle/colortitle.component';
import {Colortitle} from './models/colortitle';
import {PlanetDescriptorComponent} from './planet-descriptor/planet-descriptor.component';

@Component({
  selector: 'app-root',
	imports: [
		PlanetDescriptorComponent
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = "Cosmos";
}
