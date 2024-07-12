import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-logueorapido',
  templateUrl: './logueorapido.component.html',
  styleUrls: ['./logueorapido.component.css']
})
export class LogueorapidoComponent implements OnInit {

  @Input()usuarios: any;
  admin: User = new User();
  @Output()eventoLogueoUsuario:EventEmitter<any> = new EventEmitter<any>();
  // spinner:boolean = true;

  usuariosFiltrados: any[] = [];
  private correosOrdenados_original = [
    'paciente_a@gmail.com',
    'paciente_b@gmail.com',
    'paciente_c@gmail.com',
    'test.facundo.balsano@gmail.com', 
    'test.patricia.lu@gmail.com',
    'matiasrue@gmail.com'
  ];

  private correosOrdenados = [
    'paciente_a@gmail.com',
    'paciente_b@gmail.com',
    'paciente_c@gmail.com',
    'test.facundo.balsano@gmail.com', 
    'test.patricia.lu@gmail.com',
    'mmaurorueda@gmail.com'
  ];

  private correosOrdenados2 = [
    'paciente_a@gmail.com',
    'paciente_b@gmail.com',
    'paciente_c@gmail.com',
    'dr.balsano@gmail.com', 
    'juan@gmail.com',
    'mmaurorueda@gmail.com'
  ];


  constructor() { }

  ngOnInit(): void {
    console.log(this.usuarios);

    this.filtrarYOrdenarUsuarios();

    this.usuarios.forEach(element => {
      if(element.admin){
        this.admin = element;
      }
    });
  }

  loguear(usuario: User){
    this.eventoLogueoUsuario.emit(usuario);
  }

  filtrarYOrdenarUsuarios() {
    // Filtrar usuarios x email
    const usuariosFiltrados = this.usuarios.filter((usuario: any) =>
      this.correosOrdenados.includes(usuario.email)
    );

    // reordeno 3pac, 2med, 1adm
    this.usuariosFiltrados = this.correosOrdenados.map(correo =>
      usuariosFiltrados.find((usuario: any) => usuario.email === correo)
    );
  }

}
