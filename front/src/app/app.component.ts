import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColortitleComponent} from './colortitle/colortitle.component';

@Component({
  selector: 'app-root',
  imports: [
    ColortitleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
