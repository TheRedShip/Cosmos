import {Component, Input} from '@angular/core';
import {Planet} from '../../../models/planet';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
	@Input() planets!: Planet[];
}
