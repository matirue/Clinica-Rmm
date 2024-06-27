import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Turnos } from 'src/app/clases/turnos';
import { Turnoesp, User } from 'src/app/clases/user';

@Component({
  selector: 'app-listarturnos',
  templateUrl: './listarturnos.component.html',
  styleUrls: ['./listarturnos.component.css']
})
export class ListarturnosComponent implements OnInit {
  
  @Input()seleccioneMedico:boolean;
  @Input()especialidadSeleccionada: string;
  @Input()listadoTurnos: Turnoesp[];
  @Output()eventoSeleccionHorario: EventEmitter<any>  = new EventEmitter();
  @Input()medico: User;


  constructor(
    
  ) { }

  ngOnInit(): void {
    console.log("TURNOS");
    console.log(this.listadoTurnos);
    this.listadoTurnos.forEach(turno => {
      // console.log(turno.especialidad);
      turno.horarios.forEach(hora => {
        // console.log(hora);
      });
    });
  }
  seleccionTurno(fecha:string, hora: string){

    // console.log(fecha)
    // console.log(hora)
    let objAux = {
      fecha: fecha,
      hora: hora,
      
    }

    this.eventoSeleccionHorario.emit(objAux)
  }
  

}
