import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoTurno } from 'src/app/clases/estado-turno';
import { Historia } from 'src/app/clases/historia';
import { Estados, Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  textoABuscar: string = '';
  descripcionBajaTurno: string = '';
  @Input()turnos: Turnos[];
  misTurnos: Turnos[] = [];
  allTurnos: Turnos[] = [];
  estados: EstadoTurno[] = [];
  usuarioLogueado: User = new User();
  estadoTurno: EstadoTurno = new EstadoTurno();
  turnoSeleccionado: Turnos;
  mostrarHistoria: boolean = false;
  historias: Historia[] = [];
  constructor(
    private fireSvc: FirebaseService,
    private alertas: AlertasService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  
  ngOnInit(): void {
    
    
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    
    this.fireSvc.getAllEstados().subscribe(estados=>{
      this.estados = estados;
    });
    this.fireSvc.getAllHistorias().subscribe(historias=>{
      historias.forEach(historia => {
      // console.log(historia);
      // console.log(this.usuarioLogueado.uid);

        if(historia.turno.especialista.uid == this.usuarioLogueado.uid){
          this.historias.push(historia);
        }
      });
    });

    this.fireSvc.getAllTurnos().subscribe((turnos)=>{

      let turnoAux: Turnos[] = [];


      // console.log(turnos)
      // console.log(this.usuarioLogueado)
      
      turnos.forEach(turno => {

          if(this.usuarioLogueado.paciente){
            if(this.usuarioLogueado.uid == turno.paciente.uid){
    
              turnoAux.push(turno) 
              this.misTurnos.push(turno)
  
  
              // this.misTurnos.push(turno);
              
            }
            else{
              // console.log("no es igual")
    
            }
          
          }
          else if(this.usuarioLogueado.especialista){
            if(this.usuarioLogueado.uid == turno.especialista.uid){
    
              // console.log("igual")
              turnoAux.push(turno) 
              
            }
            else{
              // console.log("no es igual")
    
            }
          }
          else{
            this.allTurnos.push(turno);
          }
        
        
         
      });
      this.misTurnos = turnoAux; 
      this.spinner.hide();

    });
  }
  
  cancelarTurno(turno: Turnos){
    
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Cancelar turno','Ingrese motivo de la cancelación del turno').then(comentario=>{
      
      if(comentario != undefined){

        
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioPaciente = comentario;
        this.estadoTurno.estado = Estados.CANCELADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.CANCELADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);
    }
    });
  }
  rechazarTurno(turno: Turnos){
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Rechazar turno','Ingrese motivo del rechazo del turno').then(comentario=>{
      if(comentario != undefined){
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioMedico = comentario;
        this.estadoTurno.estado = Estados.RECHAZADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.RECHAZADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);

      }

    });
  }
  aceptarTurno(turno: Turnos){
    
    this.spinner.show();
    this.turnoSeleccionado = turno;
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.estado = Estados.ACEPTADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.ACEPTADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno).then(a=>{
        this.spinner.hide();
        this.alertas.mostraAlertaSimpleSuccess('Turno aceptado','Estado de turno');
      });


      

  }

  finalizarTurno(turno:Turnos){
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Finalizar turno','Ingrese un comentario o reseña sobre la atencion que se le realizo al paciente').then(comentario=>{
      if(comentario != undefined){
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioMedico = comentario;
        this.estadoTurno.estado = Estados.REALIZADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.REALIZADO;
      this.turnoSeleccionado.resenia = comentario;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);

      }

    });

  }
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'REALIZADO':
        return 'realizado';
      case 'ACEPTADO':
        return 'aceptado';
      case 'RECHAZADO':
        return 'rechazado';
      case 'PENDIENTE':
        return 'pendiente';
      case 'CANCELADO':
        return 'cancelado';
      
      default:
        return '';
    }
  }

  verResenia(turno:Turnos){
    this.alertas.mostraAlertaSimpleSinIcono(turno.resenia,'Reseña del turno');

  }
  calificarAtencion(turno: Turnos){
    // console.log(turno);
    this.alertas.mostraAlertaInput('Calificar atención','Ingrese comentario sobre la atencion del especialista ' + turno.especialista.nombre +", " +turno.especialista.apellido).then(texto=>{

      if(texto != undefined){

        
          // console.log(turno.id)
          // if(turno.id == element.turno.id){
            
            this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
            this.estadoTurno.hora = this.estadoTurno.obtenerHora();
            this.estadoTurno.estado = turno.estado;
  
            this.estadoTurno.especialista = turno.especialista;
            this.estadoTurno.especialidad = turno.especialidad;
            
            this.estadoTurno.comentarioPaciente = texto;
            turno.comentarioPaciente = texto;
            this.estadoTurno.turno = turno;
            if(this.usuarioLogueado.paciente){
              this.estadoTurno.paciente = this.usuarioLogueado;
            }
            this.fireSvc.addEstado(this.estadoTurno,turno).then(()=>{
              this.router.navigate(['']);
            });
            
    
            
          // }
      }
    });
  }
  cargarHistoriaClinica(turno: Turnos){
    // console.log("hola")
    this.mostrarHistoria = true;
    this.turnoSeleccionado = turno;
  }

}
