import { Component, Input, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-mostrar-historia-medico',
  templateUrl: './mostrar-historia-medico.component.html',
  styleUrls: ['./mostrar-historia-medico.component.css']
})
export class MostrarHistoriaMedicoComponent implements OnInit {

  constructor(
    private alerta: AlertasService
  ) { }
  @Input()historia = [];
  ngOnInit(): void {
    console.log(this.historia);
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
