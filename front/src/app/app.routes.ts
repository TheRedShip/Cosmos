import { Routes } from '@angular/router';

import { AllPlanetsComponent } from './all-planets/all-planets.component';
import { PlanetDescriptorComponent } from './planet-descriptor/planet-descriptor.component';

export const routes: Routes = [
	{ path: '', component: AllPlanetsComponent },
	{ path: 'planet/:id', component: PlanetDescriptorComponent }
];
