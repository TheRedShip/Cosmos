import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PlanetStatisticComponent} from './planet-statistic/planet-statistic.component';
import {PlanetStatsService} from '../../service/planet-statistics-service/planet-statistics.service';
import {Planet} from '../../models/planet';
import {PlanetStats} from '../../models/planet-stats';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-planet-statistic-list',
	imports: [
		PlanetStatisticComponent
	],
  templateUrl: './planet-statistic-list.component.html',
  styleUrl: './planet-statistic-list.component.css'
})
export class PlanetStatisticListComponent implements OnInit {
	public stats: PlanetStats | null = null;

	@Input() planet_id!: number;

	@ViewChild("statistic_container_front") statistic_container_front!: ElementRef;

	constructor(private planetStatisticsService: PlanetStatsService) {}

	ngOnInit(): void {
		this.planetStatisticsService.getPlanetStatsById(this.planet_id).subscribe(data =>
		{
			this.stats = data;
			console.log(this.stats)
		});
	}
}
