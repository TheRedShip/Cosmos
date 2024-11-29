import {
	Component,
	ElementRef,
	Host,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {PlanetStatisticComponent} from '../planet-statistic-list/planet-statistic/planet-statistic.component';
import {Planet} from '../../models/planet';
import {ActivatedRoute} from '@angular/router';
import {PlanetService} from '../../service/planet-service/planet.service';
import {AllPlanetsComponent} from '../all-planets/all-planets.component';
import {PlanetOrbitComponent} from '../planet-orbit/planet-orbit.component';
import {PlanetStatisticListComponent} from '../planet-statistic-list/planet-statistic-list.component';

@Component({
	selector: 'app-planet-descriptor',
	imports: [
		PlanetStatisticListComponent
	],
	templateUrl: './planet-descriptor.component.html',
	styleUrl: './planet-descriptor.component.css'
})
export class PlanetDescriptorComponent implements OnInit {
	public planet_component!: PlanetOrbitComponent;
	public parent!: AllPlanetsComponent;

	private max_scroll: number = 200;
	private scroll: number = this.max_scroll;
	private scroll_factor: number = 25;

	@ViewChild("planet_descriptor_front") planet_descriptor_front!: ElementRef;
	@ViewChild(PlanetStatisticListComponent) statistic_container!: PlanetStatisticListComponent;

	@ViewChild("planet_name_front") planet_name_front!: ElementRef;
	@ViewChild("planet_description_front") planet_description_front!: ElementRef;

    ngOnInit(): void {}

	@HostListener('window:wheel', ['$event'])
	onWindowScroll(event: any)
	{
		const direction = event.deltaY / Math.abs(event.deltaY);

		if (this.scroll - direction * this.scroll_factor > this.max_scroll)
			return ;

		this.scroll -= direction * this.scroll_factor

		if (this.scroll < this.max_scroll / 2)
			return this.reset();

		this.setAnimationValue(this.scroll, direction);
	}

	setAnimationValue(value: number, direction: number)
	{
		console.log(value);
		this.planet_descriptor_front.nativeElement.style.opacity = value / this.max_scroll;

		this.statistic_container.statistic_container_front.nativeElement.style.opacity = value / this.max_scroll;

		this.planet_name_front.nativeElement.style.transform = `translateY(-${(this.max_scroll - value) * 1.5}px)`;
		this.planet_description_front.nativeElement.style.transform = `translateX(-${(this.max_scroll - value) * 1.5}px)`;
		this.statistic_container.statistic_container_front.nativeElement.style.transform = `translateY(${(this.max_scroll - value) * 1.5}px)`;

		const previous_scale = getComputedStyle(this.planet_component.image_planet_front.nativeElement).getPropertyValue("--translate-scale");
		this.planet_component.image_planet_front.nativeElement.style.setProperty("--translate-scale", parseFloat(previous_scale) - 0.2 * direction);
	}

	private reset()
	{
		this.scroll = 0;
		this.setAnimationValue(this.scroll, 1);

		this.planet_component.image_planet_front.nativeElement.style.setProperty("--translate-x", 0);
		this.planet_component.image_planet_front.nativeElement.style.setProperty("--translate-y", 0);
		this.planet_component.image_planet_front.nativeElement.style.setProperty("--translate-scale", 1);

		this.parent.reset(this.planet_component);
	}

}
