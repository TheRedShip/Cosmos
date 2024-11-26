import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../../models/planet';
import {PlanetService} from '../../planet-service/planet.service';
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-all-planets',
  imports: [ PlanetOrbitComponent ],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent implements OnInit {
	public planets!: Planet[];
	public orbit_size: number[] = [
		3800,
		3400,
		3000,
		2600,
		2200,
		1800,
		1400,
		1050,
	];
	@ViewChildren("child_planet")
	private child_planets!: QueryList<ElementRef>;

	constructor(private planetService: PlanetService) {}

	ngOnInit(): void {
		this.planets = this.planetService.getPlanets();
    }

	zoomToPlanet(planet_front: ElementRef): void
	{
		const rect = planet_front.nativeElement.getBoundingClientRect();

		const scaleX = window.innerWidth / rect.width;
		const scaleY = window.innerHeight / rect.height;
		const scale = Math.max(scaleX, scaleY);
		const translateX = (window.innerWidth / 2 - (rect.left + rect.width / 2));
		const translateY = ((window.innerHeight / 2 - (rect.top + rect.height / 2))) + window.innerHeight / 2;

		planet_front.nativeElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
	}

	private removeAllPlanets(selected_planet: PlanetOrbitComponent)
	{
		this.child_planets.forEach((element: any, index: number) =>
		{
			if (element.image_planet_front == selected_planet.image_planet_front)
				return;

			const top_info_container = element.top_info_container.nativeElement;
			const below_info_container = element.below_info_container.nativeElement;
			const image_planet = element.image_planet_front.nativeElement;
			const image_container = element.image_container_front.nativeElement;
			const animation_delay: number = 75;

			const distance = Math.abs(selected_planet.id - index);
			const direction = selected_planet.id > index ? -1 : 1;
			const impulse = direction * -distance;

			setTimeout(():void => {image_container.style.borderColor = "rgba(255,255,255,0)";}, animation_delay * distance);
			setTimeout(():void => {image_container.style.transform = `translateX(${impulse * 150}px) scale(0)`}, animation_delay * distance);

			setTimeout(():void => {top_info_container.classList.add("fade-out"); below_info_container.classList.add("fade-out");}, animation_delay * distance);
			setTimeout(():void => {top_info_container.style.transform = `translateY(${-distance * 50}px)`}, 0);
			setTimeout(():void => {below_info_container.style.transform = `translateY(${distance * 50}px)`}, 0);

		})
	}

	private showDetailsPlanet(planet_front: ElementRef)
	{
		planet_front.nativeElement.classList.add('clicked');
	}

	onClickPlanet(planetComponent: PlanetOrbitComponent): void
	{
		// this.zoomToPlanet(planetComponent.planet_front);
		this.removeAllPlanets(planetComponent);
		// this.showDetailsPlanet(planetComponent.planet_front);
	}
}
