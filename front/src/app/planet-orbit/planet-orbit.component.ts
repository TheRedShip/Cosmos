import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-planet-orbit',
  imports: [],
  templateUrl: './planet-orbit.component.html',
  styleUrl: './planet-orbit.component.css'
})
export class PlanetOrbitComponent {
  @Input() orbit_size!: number;
}
