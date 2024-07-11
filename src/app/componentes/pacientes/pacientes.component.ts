import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  usuarioLogueado: User = new User();
  turnosHistorias: Turnos[] = []; 

  constructor(
    private authSvc: AuthService,
    private fireSvc: FirebaseService
  ) { }

  ngOnInit(): void {
    this.authSvc.afAuth.authState.subscribe(res=>{
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));      
      // console.log("us>>>");      
      // console.log(this.usuarioLogueado); 
    });

    this.fireSvc.getAllTurnos().subscribe(auxTurnosHistorias => {

      // this.turnosHistorias = auxTurnosHistorias;
      this.turnosHistorias = auxTurnosHistorias.filter(turno => turno.especialista.dni === this.usuarioLogueado.dni && turno.historia != null); 
      
      console.log("TURNOS history>>>");      
      console.log(this.turnosHistorias);   

    })
  }

}
