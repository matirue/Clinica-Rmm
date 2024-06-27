import { Turnos } from "./turnos";

export class User {
    email: string;
    uid: string;
    username?: string;
    nombre: string;
    apellido: string;
    edad: string;
    dni: string;
    fecha: string;
    especialista?:boolean;
    fotoPerfil:string;
    fotoPerfilDos?:string;
    descripcion?:string[];
    aprobadoPorAdmin?:boolean;
    admin?:boolean;
    paciente?:boolean;
    password?:string;
    disponibilidad?:any;
    disponibilidadEsp?:Turnoesp[];
    turno?: Turnos;
    baja?:boolean;
    constructor(){
        this.descripcion = [];
        this.email = "";
        this.uid = "";
        this.username = "";
        
        this.fecha = '';
        this.fotoPerfil = "";
        this.fotoPerfilDos = "";
    }
    obtenerFechaHora?(){
        var fecha:Date = new Date();
        var segString: string = '';
        var minString : string = '';
        if(fecha.getSeconds().toString().length >= 2){
            segString = fecha.getSeconds().toString();
          }
        else{
            segString = "0"+ fecha.getSeconds().toString();
        }
        if(fecha.getMinutes().toString().length >=2){
            minString = fecha.getSeconds().toString();
        }
        else{
            minString = "0"+fecha.getMinutes().toString();
        }
        var fechaCompleta = (fecha.getMonth()+1)+ "-"+  fecha.getDate()  +  "-" + fecha.getFullYear();
        // console.log(fechaCompleta + "-" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString);
        return fechaCompleta + "_" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString;
      }
}
export class Turnoesp {
    especialidad:string;
    fecha: string;
    horarios: Horarios[];
}
export class Horarios{
    hora:string;
    disponible:boolean;
}
