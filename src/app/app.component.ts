import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimation, slideTurno } from './route-transition-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInOutAnimation, slideTurno], 
    host: { '[@slideInOutAnimation]': '' }
  
})
export class AppComponent {
  title = 'clinicarmm';
  toggleNavbar:boolean = false;
  
  prepareRoute(outlet: RouterOutlet) {
    
    return outlet && outlet.activatedRouteData &&  outlet.activatedRouteData['animation'];
  }

}
