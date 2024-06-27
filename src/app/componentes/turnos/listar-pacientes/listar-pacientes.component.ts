import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  @Input()listadoPacientes:User[];
  
  @Output()eventoSeleccionPaciente: EventEmitter<any>  = new EventEmitter();
  pacienteSeleccionado: User;
  constructor() { }

  ngOnInit(): void {
  }
  seleccionPaciente(paciente: User){
    this.eventoSeleccionPaciente.emit(paciente);
  }

}
