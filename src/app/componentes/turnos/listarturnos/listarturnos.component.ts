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
    // console.log("TURNOS");
    // console.log(this.listadoTurnos);
    this.listadoTurnos.forEach(turno => {
      // console.log(turno.especialidad);
      turno.horarios.forEach(hora => {
        // const formattedTime = this.convertTo12HourFormat(hora);
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

  convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convierte 0 a 12 para la hora 12 AM/PM
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  

}
