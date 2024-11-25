import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Planet} from '../models/planet';

@Component({
  selector: 'app-planet-orbit',
  imports: [],
  templateUrl: './planet-orbit.component.html',
  styleUrl: './planet-orbit.component.css'
})
export class PlanetOrbitComponent {
	@Input() planet!: Planet;
	@Input() orbit_size!: number;
}
