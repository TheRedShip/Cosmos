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
import {PlanetStatisticComponent} from '../planet-statistic/planet-statistic.component';
import {Planet} from '../../models/planet';
import {ActivatedRoute} from '@angular/router';
import {PlanetService} from '../../planet-service/planet.service';

@Component({
	selector: 'app-planet-descriptor',
	imports: [
		PlanetStatisticComponent
	],
	templateUrl: './planet-descriptor.component.html',
	styleUrl: './planet-descriptor.component.css'
})
export class PlanetDescriptorComponent implements OnInit {
	public planet!: Planet;
	private max_scroll: number = 200;
	private scroll: number = this.max_scroll;
	private scroll_factor: number = 25;

	@ViewChild("planet_descriptor_front") planet_descriptor_front!: ElementRef;
	@ViewChild("statistic_container_front") statistic_container_front!: ElementRef;

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

		this.setAnimationValue(this.scroll);
	}

	setAnimationValue(value: number)
	{
		this.planet_descriptor_front.nativeElement.style.opacity = value / this.max_scroll;
		this.statistic_container_front.nativeElement.style.opacity = value / this.max_scroll;

		this.planet_name_front.nativeElement.style.transform = `translateY(-${(this.max_scroll - value) * 1.5}px)`;
		this.planet_description_front.nativeElement.style.transform = `translateX(-${(this.max_scroll - value) * 1.5}px)`;
		this.statistic_container_front.nativeElement.style.transform = `translateY(${(this.max_scroll - value) * 1.5}px)`;

		//destroy
	}

	private reset()
	{
		this.scroll = 0;
		this.setAnimationValue(this.scroll)
	}

}
