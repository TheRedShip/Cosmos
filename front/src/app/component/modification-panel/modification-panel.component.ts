import {Component, OnInit} from '@angular/core';
import {ColortitleComponent} from '../colortitle/colortitle.component';
import {TableComponent} from './table/table.component';
import {PlanetService} from '../../service/planet-service/planet.service';
import {Planet} from '../../models/planet';

@Component({
  selector: 'app-modification-panel',
	imports: [
		ColortitleComponent,
		TableComponent
	],
  templateUrl: './modification-panel.component.html',
  styleUrl: './modification-panel.component.css'
})
export class ModificationPanelComponent implements OnInit {
	public planets!: Planet[];

	constructor(private planetService: PlanetService) {}

	ngOnInit(): void
	{
		this.planetService.getPlanets().subscribe(data => {
			this.planets = data;
		})
    }


}
