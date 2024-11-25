import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Planet} from '../../models/planet';
import {Router} from '@angular/router';
import {PlanetService} from '../../planet-service/planet.service';

@Component({
  selector: 'app-planet-orbit',
  imports: [],
  templateUrl: './planet-orbit.component.html',
  styleUrl: './planet-orbit.component.css'
})
export class PlanetOrbitComponent {
	@Input() planet!: Planet;
	@Input() orbit_size!: number;
	@Input() id!: number;

	@ViewChild("planet_front") planet_front!: ElementRef;

	constructor(private router: Router, private planetService: PlanetService) {}

	getPlanetFrontSize(): number
	{
		const biggest_diameter = this.planetService.getBiggestPlanet().diameter;
		const smallest_diameter = this.planetService.getSmallestPlanet().diameter;
		const biggest_value = 175;
		const smallest_value = 75;
		return smallest_value + (this.planet.diameter - smallest_diameter) / (biggest_diameter - smallest_diameter ) * (biggest_value - smallest_value);
	}

	zoomToPlanet(): void
	{
		const rect = this.planet_front.nativeElement.getBoundingClientRect();

		const scaleX = window.innerWidth / rect.width;
		const scaleY = window.innerHeight / rect.height;
		const scale = Math.max(scaleX, scaleY);
		const translateX = (window.innerWidth / 2 - (rect.left + rect.width / 2));
		const translateY = ((window.innerHeight / 2 - (rect.top + rect.height / 2))) + window.innerHeight / 2;

		this.planet_front.nativeElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
	}

	private removeAllPlanets()
	{

	}

	private detailsPlanet()
	{
		this.planet_front.nativeElement.classList.add('clicked');
	}

	onClickImage(): void
	{
		this.zoomToPlanet();
		this.removeAllPlanets();
		this.detailsPlanet();

		setTimeout(() =>
		{
			// this.router.navigateByUrl("/planet/" + this.id);
		}, 1000)
	}

}
