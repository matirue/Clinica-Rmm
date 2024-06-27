import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  errorMessage = '';
  email: string ='';
  password: string = '';
  emailRegister: string ='';
  passwordRegister: string = '';
  flag: boolean = false; 
  userAdm: User = new User();
  userAux: User[] = [];
  spinnerChico: boolean = true;
  
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private authSvc: AuthService,
   private spinner: NgxSpinnerService,
   private fireSvc: FirebaseService) { 

   }

   
  user: User = new User();

  ngOnInit(): void {
    this.fireSvc.getAllUsers().subscribe((usr)=>{
      sessionStorage.clear();
      this.spinnerChico = false;
      this.userAux = usr;
    });
  }
  capturarHardcodeo(usuario: User){
    
    this.email = usuario.email;
    this.password = usuario.password;
  }
   
  async login(){
    this.spinner.show();
  
    this.user.email = this.email;
    //verificar si el usuario esta habilitado o no
    try {      
      await this.authSvc.SignIn(this.user,this.password).then((res)=>{
        this.spinner.hide();
        this.flag = false;
      }); 
      
    } catch (error) {      
      // console.log(error);
    }
  }
  completarCamposAdmin(){
    this.email = "matiasrue@gmail.com";
    this.password = "admin1234";
  }
  completarDrFacundo(){
    this.email = "test_facundo_balsano@gmail.com";
    this.password = "facundo123";
  }
  completarDrHous(){
    this.email = "drhouse@gmail.com";
    this.password = "house1234";
  }

  completarPacienteA(){
    this.email = "paciente_a@gmail.com";
    this.password = "test123";
  }
  
  completarPacienteB(){
    this.email = "paciente_b@gmail.com";
    this.password = "test123";
  }
  completarPacienteC(){
    this.email = "paciente_c@gmail.com";
    this.password = "test123";
  }

}
