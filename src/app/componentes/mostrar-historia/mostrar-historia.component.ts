import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Historia } from 'src/app/clases/historia';

@Component({
  selector: 'app-mostrar-historia',
  templateUrl: './mostrar-historia.component.html',
  styleUrls: ['./mostrar-historia.component.css']
})
export class MostrarHistoriaComponent implements OnInit {

  @Input()historia = [];
  textoABuscar: string = '';
  
  constructor() {}

  ngOnInit(): void {}

}
