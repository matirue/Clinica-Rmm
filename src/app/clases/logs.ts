import { User } from "./user";

export class Logs {
    id: string;
    usuario:User;
    dia: string;
    hora:string;


    obtenerFecha?(){
        var fecha:Date = new Date();
        
        var fechaCompleta = (fecha.getMonth()+1)+ "-"+  fecha.getDate()  +  "-" + fecha.getFullYear();
        // console.log(fechaCompleta + "-" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString);
        return fechaCompleta ;
    }
    obtenerHora?(){
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
        return fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString
    }
}