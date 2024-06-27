import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';
import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mostrarturnos',
  templateUrl: './mostrarturnos.component.html',
  styleUrls: ['./mostrarturnos.component.css']
})
export class MostrarturnosComponent implements OnInit {

  textoABuscar: string = '';
  descripcionBajaTurno: string = '';
  turnos: Turnos[] = [];
  constructor(
    private fireSvc: FirebaseService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    this.fireSvc.getAllTurnos().subscribe((turnos)=>{

      console.log(turnos)
      this.turnos = turnos;

    });
  }
  cancelarTurno(turno: Turnos,j:number){
    /**disparar input alert */

    this.descripcionBajaTurno += 'Turno dado de baja por: ';
    
    
    this.alertas.mostraAlertaInput('Cancelar turno','Ingrese motivo de la cancelación del turno').then(text=>{
      this.descripcionBajaTurno +=  text;
      for (let i = 0; i < this.turnos.length; i++) {
        if(this.turnos[j] == turno){
          console.log("cancelo el turno")
          console.log(this.turnos[j]);
          console.log(" y ");
          console.log(turno);
          this.turnos[j].estado = "RECHAZADO";
          this.turnos[j].descripcion = this.descripcionBajaTurno;
          this.fireSvc.updateTurno(this.turnos[j]);
        }
        
      }
    });

    // this.turnos.forEach
  }
  

}
