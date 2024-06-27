import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../clases/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit {
  public toggleNavbar = true;
  ocultarLogin: boolean = true;
  ocultarRegistro: boolean = false;
  ocultarBotonesLogueo: boolean = false;
  adminLogueado:boolean = false;
  usuarioLogueado: User = new User();
  usuario : User = new User();
  logueado: boolean = false;
  ocultarMensaje : boolean = true;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    // console.log(this.authSvc.isLogged);
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
            
            if(this.usuario.admin){
              this.adminLogueado = true;
            }
            
          }
          else{
            this.adminLogueado = false;
            
          }
        }
        else{
          this.adminLogueado = false;
        }
        
      });
  }
  obtenerEventoBotonLogueo(ocultarBoton: boolean){
    // console.log("recibi boton deslogueo "+ ocultarBoton);
    this.ocultarBotonesLogueo = ocultarBoton;
  }
  async desloguear(){
  
    this.ocultarMensaje = false;
    
    if(this.usuario != null && this.usuarioLogueado != null){


      if(this.usuario.email = this.usuarioLogueado.email){
        this.authSvc.desloguear();
        
        sessionStorage.clear();
        this.usuarioLogueado = null;
        localStorage.removeItem("usuarioLogueado");
        this.router.navigate(["/ingreso/login"]);
        this.logueado = false;
      }
      else{
        this.logueado = true;
      }
    }
    if(this.usuario.uid== ''){
      this.logueado = false;

      this.authSvc.desloguear();
      sessionStorage.clear();
      localStorage.removeItem("usuarioLogueado");
      this.router.navigate(["/ingreso/login"]);
      
    }

  }

}
