import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Planet} from '../../models/planet';
import {Router} from '@angular/router';
import {PlanetService} from '../../planet-service/planet.service';
import {AllPlanetsComponent} from '../all-planets/all-planets.component';
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-planet-orbit',
  imports: [],
  templateUrl: './planet-orbit.component.html',
  styleUrl: './planet-orbit.component.css'
})
export class PlanetOrbitComponent {
	@Input() parent!: AllPlanetsComponent;
	@Input() planet!: Planet;
	@Input() orbit_size!: number;
	@Input() id!: number;

	@ViewChild("image_planet_front") image_planet_front!: ElementRef;
	@ViewChild("image_container_front") image_container_front!: ElementRef;

	@ViewChild("top_info_container") top_info_container!: ElementRef;
	@ViewChild("below_info_container") below_info_container!: ElementRef;

	@ViewChild("orbit_front") orbit_front!: ElementRef;

	constructor(private router: Router, private planetService: PlanetService) {}

	getPlanetFrontSize(): number
	{
		const biggest_diameter = this.planetService.getBiggestPlanet().diameter;
		const smallest_diameter = this.planetService.getSmallestPlanet().diameter;
		const biggest_value = 175;
		const smallest_value = 75;
		return smallest_value + (this.planet.diameter - smallest_diameter) / (biggest_diameter - smallest_diameter ) * (biggest_value - smallest_value);
	}

	hideSwoosh(impulse: number, distance: number, animation_delay: number, selected_planet: PlanetOrbitComponent)
	{
		const top_info_container = this.top_info_container.nativeElement;
		const below_info_container = this.below_info_container.nativeElement;
		const orbit_front = this.orbit_front.nativeElement;
		const image_container = this.image_container_front.nativeElement;

		image_container.style.setProperty('--impulse-distance', `${impulse * 150}px`);
		top_info_container.style.setProperty('--distance-y', `${-distance * 40}px`);
		below_info_container.style.setProperty('--distance-y', `${distance * 40}px`);

		setTimeout(() =>
		{
			top_info_container.classList.add("move-to-distance-and-fade-out");
			below_info_container.classList.add("move-to-distance-and-fade-out");
		}, animation_delay * distance);

		setTimeout(() =>
		{
			orbit_front.classList.add("opacity-fade-out");
		}, animation_delay * distance)

		if (this.image_planet_front == selected_planet.image_planet_front)
			return;

		setTimeout(() =>
		{
			image_container.classList.add("move-and-scale-and-fade-out");
		}, animation_delay * distance);
	}

	onClickImage(): void
	{
		this.parent.onClickPlanet(this);
	}

}
