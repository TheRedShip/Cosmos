import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../../models/planet';
import {PlanetService} from '../../planet-service/planet.service';
import {Element} from '@angular/compiler';
import {PlanetDescriptorComponent} from '../planet-descriptor/planet-descriptor.component';

@Component({
  selector: 'app-all-planets',
  imports: [ PlanetOrbitComponent ],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent implements OnInit {
	public planets!: Planet[];
	public orbit_size: number[] = [
		3950,
		3500,
		3100,
		2650,
		2200,
		1800,
		1400,
		1000,
	];

	@ViewChildren("child_planet") private child_planets!: QueryList<ElementRef>;
	@ViewChild("child_sun") private child_sun!: ElementRef;

	constructor(private planetService: PlanetService, private viewContainer: ViewContainerRef) {}

	ngOnInit(): void {
		this.planets = this.planetService.getPlanets();
    }

	private removeAllPlanets(selected_planet: PlanetOrbitComponent)
	{
		this.child_planets.forEach((element: any, index: number) =>
		{
			const top_info_container = element.top_info_container.nativeElement;
			const below_info_container = element.below_info_container.nativeElement;
			const orbit_front = element.orbit_front.nativeElement;
			const image_container = element.image_container_front.nativeElement;
			const animation_delay: number = 50;

			const distance = Math.abs(selected_planet.id - index);
			const direction = selected_planet.id > index ? -1 : 1;
			const impulse = direction * -distance;


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

			if (element.image_planet_front == selected_planet.image_planet_front)
				return;

			setTimeout(() =>
			{
				image_container.classList.add("move-and-scale-and-fade-out");
			}, animation_delay * distance);
		})

		this.child_sun.nativeElement.classList.add("move-fade-out");
	}

	zoomToPlanet(planet_front: ElementRef): void
	{
		const rect = planet_front.nativeElement.getBoundingClientRect();

		const scaleX = window.innerWidth / rect.width;
		const scaleY = window.innerHeight / rect.height;
		const scale = Math.max(scaleX, scaleY);
		const translateX = (window.innerWidth / 2 - (rect.left + rect.width / 2));
		const translateY = ((window.innerHeight / 2 - (rect.top + rect.height / 2))) + window.innerHeight / 2;

		planet_front.nativeElement.style.transitionDuration = '1s';
		planet_front.nativeElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
	}

	private showDetailsPlanet(planet: Planet)
	{
		const componentRef = this.viewContainer.createComponent(PlanetDescriptorComponent);

		componentRef.instance.planet = planet;
	}

	onClickPlanet(planetComponent: PlanetOrbitComponent): void
	{
		planetComponent.image_planet_front.nativeElement.classList.add('clicked');

		this.removeAllPlanets(planetComponent);
		setTimeout(() => {this.zoomToPlanet(planetComponent.image_planet_front);}, 750);
		planetComponent.image_planet_front.nativeElement.style.zIndex = 0;
		setTimeout(() => {this.showDetailsPlanet(planetComponent.planet);}, 1200);
	}
}
