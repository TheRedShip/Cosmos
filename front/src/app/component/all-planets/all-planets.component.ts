import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { PlanetOrbitComponent } from '../planet-orbit/planet-orbit.component';
import {Planet} from '../../models/planet';
import {PlanetService} from '../../planet-service/planet.service';
import {PlanetDescriptorComponent} from '../planet-descriptor/planet-descriptor.component';
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

			const animation_delay: number = 100;

			const distance = Math.abs(selected_planet.id - index);
			const direction = selected_planet.id > index ? -1 : 1;
			const impulse = direction * -distance;

			element.hideSwoosh(impulse, distance, animation_delay, selected_planet);
		})

		selected_planet.image_container_front.nativeElement.classList.add("border-fade-out");
		this.child_sun.nativeElement.classList.add("move-fade-out");
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
		setTimeout(() => {planetComponent.showZoom()}, 750);
		setTimeout(() => {this.showDetailsPlanet(planetComponent.planet);}, 2500);
	}
}
