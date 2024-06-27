import { Component, Input, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';

@Component({
  selector: 'app-detalle-historia',
  templateUrl: './detalle-historia.component.html',
  styleUrls: ['./detalle-historia.component.css']
})
export class DetalleHistoriaComponent implements OnInit {

  constructor() { }
  @Input()hist:Historia;
  ngOnInit(): void {
  }

}
