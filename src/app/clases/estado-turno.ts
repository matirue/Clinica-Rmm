import { Especialidad } from "./especialidad";
import { Turnos } from "./turnos";
import { User } from "./user";

export class EstadoTurno {
    id:string;
    especialidad:string;
    especialista: User;
    paciente: User;
    fecha: string;
    hora:string;
    estado: string;
    turno: Turnos;
    comentarioPaciente?:  string;
    comentarioMedico?:  string;
    resenia?:  string;
    diagnostico?: string;
    
    obtenerFecha(){
        var fecha:Date = new Date();
        // var segString: string = '';
        // var minString : string = '';
        // if(fecha.getSeconds().toString().length >= 2){
        //     segString = fecha.getSeconds().toString();
        //   }
        // else{
        //     segString = "0"+ fecha.getSeconds().toString();
        // }
        // if(fecha.getMinutes().toString().length >=2){
        //     minString = fecha.getSeconds().toString();
        // }
        // else{
        //     minString = "0"+fecha.getMinutes().toString();
        // }
        var fechaCompleta = fecha.getFullYear()+ "-" + (fecha.getMonth()+1)+ "-"+  fecha.getDate();
        // console.log(fechaCompleta + "-" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString);
        return fechaCompleta;
    }
    obtenerHora(){
        var hora:Date = new Date();
        return hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds();
    }
}
