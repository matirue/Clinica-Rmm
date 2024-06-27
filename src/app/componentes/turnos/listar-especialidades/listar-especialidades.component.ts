import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-listar-especialidades',
  templateUrl: './listar-especialidades.component.html',
  styleUrls: ['./listar-especialidades.component.css']
})
export class ListarEspecialidadesComponent implements OnInit {

  @Input()especialidades: Especialidad[];
  @Output()eventoFiltroEspecialidad: EventEmitter<any>  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.especialidades)
  }
  enviarEventoEspecialidad(especialidad:string){
    this.eventoFiltroEspecialidad.emit(especialidad);
  }

}
