import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Planet} from '../../models/planet';
import {Router} from '@angular/router';
import {PlanetService} from '../../planet-service/planet.service';
import {AllPlanetsComponent} from '../all-planets/all-planets.component';
import {Element} from '@angular/compiler';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-planet-orbit',
  imports: [],
  templateUrl: './planet-orbit.component.html',
  styleUrl: './planet-orbit.component.css'
})
export class PlanetOrbitComponent implements OnInit {
	@Input() parent!: AllPlanetsComponent;
	@Input() planet!: Planet;
	@Input() orbit_size!: number;
	@Input() id!: number;

	public planet_front_size!: number;

	@ViewChild("image_planet_front") image_planet_front!: ElementRef;
	@ViewChild("image_container_front") image_container_front!: ElementRef;

	@ViewChild("top_info_container") top_info_container!: ElementRef;
	@ViewChild("below_info_container") below_info_container!: ElementRef;

	@ViewChild("orbit_front") orbit_front!: ElementRef;

	constructor(private planetService: PlanetService) {}

	async ngOnInit(): Promise<void>
	{
		const biggest = await lastValueFrom(this.planetService.getBiggestPlanet());
		const smallest = await lastValueFrom(this.planetService.getSmallestPlanet());

		this.planet_front_size = this.getPlanetFrontSize(biggest.diameter, smallest.diameter);
    }

	getPlanetFrontSize(biggest_diameter: number, smallest_diameter: number): number
	{
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

	showZoom() {
		const rect = this.image_planet_front.nativeElement.getBoundingClientRect();

		const scaleX = window.innerWidth / rect.width;
		const scaleY = window.innerHeight / rect.height;
		const scale = Math.max(scaleX, scaleY);
		const translateX = (window.innerWidth / 2 - (rect.left + rect.width / 2));
		const translateY = ((window.innerHeight / 2 - (rect.top + rect.height / 2))) + window.innerHeight / 1.5;


		this.image_planet_front.nativeElement.style.setProperty("--translate-x", `${translateX}px`)
		this.image_planet_front.nativeElement.style.setProperty("--translate-y", `${translateY}px`)
		this.image_planet_front.nativeElement.style.setProperty("--translate-scale", scale);

		this.image_planet_front.nativeElement.classList.add("show-zoom");
	}

	onClickImage(): void
	{
		this.parent.onClickPlanet(this);
	}

}
