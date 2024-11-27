import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../../models/planet';
import {PlanetService} from '../../planet-service/planet.service';
import {Element} from '@angular/compiler';
import {PlanetDescriptorComponent} from '../planet-descriptor/planet-descriptor.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-all-planets',
	imports: [PlanetOrbitComponent, AsyncPipe],
  templateUrl: './all-planets.component.html',
  styleUrl: './all-planets.component.css'
})
export class AllPlanetsComponent implements OnInit {
	public planets: Planet[] = [];
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
		this.planetService.getPlanets().subscribe(data =>
		{
			this.planets = data
				.sort((a, b) => a.distance_from_sun - b.distance_from_sun)
				.reverse()
				.map(planet => {planet.image = `assets/image/planets/${planet.name.toLowerCase()}.png`; return planet});
		});
    }

	private removeAllPlanets(selected_planet: PlanetOrbitComponent)
	{
		this.child_planets.forEach((element: any, index: number) =>
		{

			const animation_delay: number = 50;

			const distance = Math.abs(selected_planet.id - index);
			const direction = selected_planet.id > index ? -1 : 1;
			const impulse = direction * -distance;

			element.hideSwoosh(impulse, distance, animation_delay, selected_planet);
		})

		selected_planet.image_container_front.nativeElement.classList.add("border-fade-out");
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
		setTimeout(() => {this.showDetailsPlanet(planetComponent.planet);}, 2500);
	}
}
