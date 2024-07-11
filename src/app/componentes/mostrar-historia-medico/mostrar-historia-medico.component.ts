import { Component, Input, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { User } from 'src/app/clases/user';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mostrar-historia-medico',
  templateUrl: './mostrar-historia-medico.component.html',
  styleUrls: ['./mostrar-historia-medico.component.css']
})
export class MostrarHistoriaMedicoComponent implements OnInit {

  @Input()historia = [];
  usuarioLogueado: User = new User();
  textoABuscar: string = '';

  constructor(
    private alerta: AlertasService,
    private authSvc: AuthService,
  ) { }
  
  ngOnInit(): void {
    console.log(this.historia);

    this.authSvc.afAuth.authState.subscribe(res=>{
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));      
      // console.log("us>>>");      
      // console.log(this.usuarioLogueado); 
    });
  }
  verHistoria(historia: Historia){
    this.alerta.mostrarAlertaHistoria(historia);
  }
  ordenarHistoria(){
    
    // let data = ["09/06/2015", "25/06/2015", "22/06/2015", "25/07/2015", "18/05/2015"];


    // let asd= this.historia.forEach(hist => {
    //   hist.sort(function(a,b) {
    //     a = a.split('/').reverse().join('');
    //     b = b.split('/').reverse().join('');
    //     return a > b ? 1 : a < b ? -1 : 0;
        
    //     // return a.localeCompare(b);         // <-- alternative 
        
    //   });
    //   console.log(hist);
      
    // });

    // console.log(this.historia);
    // console.log(asd);

    // this.historia.sort(function(a,b) {
    //   a = a.split('/').reverse().join('');
    //   b = b.split('/').reverse().join('');
    //   return a > b ? 1 : a < b ? -1 : 0;
    //   // return a.localeCompare(b);         // <-- alternative 
    // });
  }

}
