import { Component } from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';

@Component({
  selector: 'app-all-planets',
  imports: [ PlanetOrbitComponent],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent {

}
