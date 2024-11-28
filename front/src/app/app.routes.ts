import { Routes } from '@angular/router';

import { AllPlanetsComponent } from './component/all-planets/all-planets.component';
import { PlanetDescriptorComponent } from './component/planet-descriptor/planet-descriptor.component';
import {ModificationPanelComponent} from './component/modification-panel/modification-panel.component';

export const routes: Routes = [
	{ path: '', component: AllPlanetsComponent },
	{ path: 'panel', component: ModificationPanelComponent }
];
