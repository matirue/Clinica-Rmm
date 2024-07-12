
import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminComponent } from './componentes/admin/admin.component';

import { NgxSpinnerModule } from "ngx-spinner";
import {SpinnerModule} from './componentes/spinner/spinner.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AltaTurnoComponent } from './componentes/turnos/alta-turno/alta-turno.component';
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnterDirective } from './directivas/enter.directive';
import { MostrarturnosComponent } from './componentes/turnos/mostrarturnos/mostrarturnos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MisturnosComponent } from './componentes/turnos/misturnos/misturnos.component';
import { CortarLetraPipe } from './pipes/cortar-letra.pipe';
import { ListarmedicosComponent } from './componentes/turnos/listarmedicos/listarmedicos.component';
import { ListarturnosComponent } from './componentes/turnos/listarturnos/listarturnos.component';
import { ListarPacientesComponent } from './componentes/turnos/listar-pacientes/listar-pacientes.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { TooltipDirective } from './directivas/tooltip.directive';
import { ListarEspecialidadesComponent } from './componentes/turnos/listar-especialidades/listar-especialidades.component';
import { MostrarHistoriaComponent } from './componentes/mostrar-historia/mostrar-historia.component';
import { MostrarHistoriaMedicoComponent } from './componentes/mostrar-historia-medico/mostrar-historia-medico.component';
import { DetalleHistoriaComponent } from './componentes/detalle-historia/detalle-historia.component';
import { RoundDivDirective } from './directivas/round-div.directive';
import { MedicoPipe } from './pipes/medico.pipe';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { PacienteAdminGuardGuard } from './guards/paciente-admin-guard.guard';
import { ChartModule } from 'angular-highcharts';
import { DatepipePipe } from './pipes/datepipe.pipe';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { VerifyCaptchaDirective } from './directivas/verify-captcha.directive'; 

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    AdminComponent,
    AltaTurnoComponent,
    MiperfilComponent,
    MostrarturnosComponent,
    FilterPipe,
    MisturnosComponent,
    CortarLetraPipe,
    ListarmedicosComponent,
    ListarturnosComponent,
    ListarPacientesComponent,
    HistoriaClinicaComponent,
    TooltipDirective,
    ListarEspecialidadesComponent,
    MostrarHistoriaComponent,
    MostrarHistoriaMedicoComponent,
    DetalleHistoriaComponent,
    RoundDivDirective,
    MedicoPipe,
    DatepipePipe,
    PacientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbCollapseModule,
    NgbModule,
    NavbarModule,
    SweetAlert2Module.forRoot(),
    SpinnerModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NgxSpinnerModule]
})
export class AppModule { }
