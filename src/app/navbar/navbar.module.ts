import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component'; 
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    NavbarComponent, 
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    NgbCollapseModule,
    NgbModule,
    BrowserModule,
    AngularFireAuthModule,
    
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
