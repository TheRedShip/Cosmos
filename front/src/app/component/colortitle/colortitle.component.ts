import {Component, Host, HostBinding, Input} from '@angular/core';
import {Colortitle} from '../../models/colortitle';

@Component({
  selector: 'app-colortitle',
  imports: [],
  templateUrl: './colortitle.component.html',
  styleUrl: './colortitle.component.css'
})
export class ColortitleComponent {

    @Input() title!: string;
	@Input() size!: string;
	@Input() gradient!: string;
}
