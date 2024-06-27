

import { SpinnerModule } from './../componentes/spinner/spinner.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxSpinnerModule } from "ngx-spinner";
import { LogueorapidoComponent } from './logueorapido/logueorapido.component';
// import { RecaptchaModule } from "ng-recaptcha";

import { RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY  } from 'ng-recaptcha';
import { EnterDirective } from '../directivas/enter.directive';

@NgModule({
  declarations: [
    
    LoginComponent,
    RegistroComponent,
    LogueorapidoComponent,
    EnterDirective
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SpinnerModule,
    NgxSpinnerModule,
    RecaptchaFormsModule,
    
    RecaptchaModule,
    RecaptchaV3Module
    
    
    
    
  ],
  providers: [ReCaptchaV3Service]
})
export class IngresoModule { }
