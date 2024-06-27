import { User } from "./user";

export class BajaUsuario {
    id:string;
    fecha:string;
    hora:string;
    usuario:User;
    motivo:string;
    obtenerFechaHora(){
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
