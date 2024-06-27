import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
import { Especialidad } from 'src/app/clases/especialidad';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-listarmedicos',
  templateUrl: './listarmedicos.component.html',
  styleUrls: ['./listarmedicos.component.css']
})
export class ListarmedicosComponent implements OnInit {

  @Input()especialistas: any;
  espAux = [];
  
  @Output()eventoSeleccionMedico: EventEmitter<any>  = new EventEmitter();
  @Output()eventoSeleccionEspecialidad: EventEmitter<any>  = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.especialistas);

    // console.log(this.espAux)
    // if(this.espAux.length == 0){
      
    //   if(this.filtroEspecialidad == 'todos'){
    //       this.espAux = this.especialistas;
    //       console.log(this.espAux)
    //   }
    //   else{
    //     this.especialistas.forEach(esp => {
    //       console.log(esp)

    //       esp.descripcion.forEach(descr => {
    //         console.log(descr)
    //         if(descr == this.filtroEspecialidad){
    //           this.espAux.push(esp);
    //         }
    //       });
    //     });
    //   }
    // }
    // else{
    //   this.espAux = [];
    // }
  }

  seleccionMedico(medico:User,especialidad?:string){
    // console.log(especialidad);
    if(!especialidad){
      
    }
    console.log(medico);
    // console.log(especialidad);
    this.eventoSeleccionEspecialidad.emit(especialidad)
    this.eventoSeleccionMedico.emit(medico);

  }

}
