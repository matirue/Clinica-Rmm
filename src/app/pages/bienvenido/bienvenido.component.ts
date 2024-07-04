import { Component, OnInit, ViewChild } from '@angular/core'; 
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit { 
  
  usuarioLogueado: User = new User();
  ocultarBotonesLogueo: boolean = false;
  usuario : User = new User();

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.authSvc.afAuth.authState.subscribe(res=>{
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
      if(this.usuarioLogueado != null){

        if(this.authSvc.isLogged == null){
          this.ocultarBotonesLogueo = false;
        }else{
          this.ocultarBotonesLogueo = true;
        }
        if(res && res.uid){
          this.ocultarBotonesLogueo = true;
          this.usuario = this.authSvc.obtenerUsuario(res.email);
          // console.log(this.usuario); 
          
        } 
      } 
      
    });
  }
}
