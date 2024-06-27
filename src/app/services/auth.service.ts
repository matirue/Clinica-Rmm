import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { AlertasService } from './alertas.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any;
  public emailVerificado: boolean;
  public usuarios: User[] = [];
  logueado : boolean = false;
  public logueadoObs: Observable<any>;

  constructor(public afAuth: AngularFireAuth,private router: Router,
    private alertas: AlertasService,
    private fireSvc: FirebaseService) {
      this.fireSvc.getAllUsers().subscribe((users=>{
        this.usuarios = users;
        afAuth.authState.subscribe(user => {
          this.usuarios.forEach(userAux => {
            // console.log(user)
            // console.log(userAux)
            if(user != null)
            if(userAux.email == user.email){
              this.isLogged = userAux;
              if(user.emailVerified){
                
                this.emailVerificado=true;
              }
              else{
                this.emailVerificado=true;

              }
              // console.log(this.isLogged);
  
            }
          });
        });
      }));
      
   }

  //login
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(['/']);
  }
  verificarSiAdminAprobo(usuario : User){
    let retorno = false;
    this.usuarios.forEach(user => {

      // console.log(usuario);
      if( usuario.email == user.email){
        if(usuario.aprobadoPorAdmin == false){
          // console.log("No esta aprobado");
          retorno = false;
        }
        else{
          retorno = true;
        }
      }
      
      
      
    });
    return retorno;

  }

  verificarUsuarioALoguearEspecialista(email:string){
    // console.log(email);
    let retorno = false;
    this.usuarios.forEach(usuario => {
        if(usuario.email === email && usuario.especialista){
          
          retorno = true;

          
        }
        else{
          retorno = false;
        }
    });
    return retorno;
  }
  verificarAprobacion(result:any,user:User){
    let retorno = false;
    // console.log(result);

    user = this.obtenerUsuario(user.email);
    this.isLogged = user;
    // console.log(user);

    if(!result.user.emailVerified){
      // console.log("Sin verificar");
      //si no esta verificado veo si es admin pasa de una
      // console.log(user);
      if(user.admin == true){
        localStorage.setItem('usuarioLogueado',JSON.stringify(user));
        console.log("logueado admin?")
        this.router.navigate(['/']);
        
      }
      //si no es admin muestro alerta de que no esta verificado
      else{
        if(user.paciente){
          localStorage.setItem('usuarioLogueado',JSON.stringify(user));

          this.router.navigate(['/']);
        }
        else{
          this.alertas.mostrarAlertaConfirmacionEmail('Email sin verificar','Verificación','Verifique su casilla de mail para verificar la cuenta').then(()=>{
            if(this.alertas.reenvioEmail){
  
              this.sendEmailVerification();
            }
            else{
              this.router.navigate(['ingreso/login']);
  
            }
            
          });
          
        }
      }
      // console.log("sinverificar");
      // this.alertas.mostrarAlertaConfirmacionEmail('Email sin verificar','Verificación','Email enviado correctamente')
    }
    else{
      // console.log("Verificado");
      //si esta verificado y el perfil es especialista
      // console.log(user)
      if(
        user.especialista
        // this.verificarUsuarioALoguearEspecialista(result.user.email)
        ){
        //si es especialista verifico si admin lo aprobo
          if(
            !user.aprobadoPorAdmin
            // !this.verificarSiAdminAprobo(user)
            ){
            this.alertas.mostraAlertaSimple('Un administrador debe verificar su usuario','Verificación');
            this.isLogged = null;
          }
          else{
            // console.log(this.isLogged);
            localStorage.setItem('usuarioLogueado',JSON.stringify(user));

            this.router.navigate(['/']);
          }

        }
        else{
          retorno = true;
          localStorage.setItem('usuarioLogueado',JSON.stringify(user));

          //si esta verificado y no es especialista
          this.router.navigate(['/']);
        }
    }
    return retorno;
  }
  async SignIn(user: User,password:string) {
    
    // console.log(user);
    try {
      // console.log(user);
      
      // user = this.obtenerUsuarioLogueado(user.email);
      // console.log(user.email);
        
          
        return await this.afAuth.signInWithEmailAndPassword(user.email, password).then((result)=>{
          // user = this.obtenerUsuarioLogueado(user.email);
          // this.isLogged = user;
          // console.log(result.user)

          
          // this.isLogged = user;
          // console.log(result);
          
          // localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));
          // console.log(user);
          if(this.verificarAprobacion(result,user)){
            localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));
            this.logueadoObs = new Observable( observer => {
              observer.next(true);
            })
          }
          console.log(localStorage.getItem('usuarioLogueado'))
          this.fireSvc.addLog(JSON.parse(localStorage.getItem('usuarioLogueado')));
          // console.log("aprobado?")
          
          // console.log(this.obtenerUsuarioLogueado(this.isLogged.email));
          return result;
        });
        
    } 
    catch(error){
      // console.log(error);
      
      if(error.code == 'auth/invalid-email'){

        this.alertas.mostraAlertaSimple(error,'Error');
      }
      else{
        this.alertas.mostraAlertaSimple(error,'Error');
      }
      return error;
    }
  }
  desloguear(){
    this.isLogged = null;
    this.afAuth.signOut();
  }
  async register(user: User,password:string) {
    try {
      // console.log(user);
      // console.log(user);
      var aux = await this.afAuth.createUserWithEmailAndPassword(user.email,password).then((user)=>{
        
        this.router.navigate(['/']);

        // this.SignIn(user,password);
        this.sendEmailVerification();
        return user;
      });
      return aux;

      // (await aux).user?.updateProfile({
      //   displayName: user.username
      // })
      // return await aux;
    } catch (error) {
      
      this.alertas.mostraAlertaSimple(error,'Error');
      // this.alertas.mostraAlertaSimple('Error: '+error,'Error');
      this.router.navigate(['ingreso/registro']);
      // console.log('Error on register user', error);
      return error;
    }
  }
  obtenerUsuario(email: string){
    let userAux: User = new User();

      this.usuarios.forEach(user => {
        // console.log(user)
        // console.log(email)
        if(user.email == email){
          userAux = Object.assign({},user) ;
          return;
          
        }
      });
      // console.log(userAux);
    return userAux;
  }
  obtenerPruebaUsuario(){
    var auxUser: User = new User();
    this.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        
        auxUser.email = <string>res.email;
        auxUser.uid = res.uid;
        auxUser.username = <string>res.displayName;
        // console.log(auxUser);
      }
    });
    return auxUser;
  }
  ChequearLogueado(){
    this.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.logueado = true;
      }
      else{
        this.logueado = false;
      }
    });
    return this.logueado;
  }
}
