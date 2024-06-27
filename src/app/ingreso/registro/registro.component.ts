import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import Swal from'sweetalert2';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  flag: boolean = false;
  email: string ='';
  password: string = '';
  radioEspecialidad: string = '';
  username: string = '';
  user: User = new User();
  fecha: Date = new Date();
  especialidades:Especialidad[];
  spinner:boolean = true;
  mostrarInputRadioOtro:boolean = false;
  tipo:string = 'Seleccione tipo de alta';
  downloadURLFoto1: string;
  downloadURLFoto2: string;
  file;

  mensajeArchivo: string;
  nombreArchivo: string;
  mensajeArchivo2: string;
  nombreArchivo2: string;
  
  porcentaje:number = 0;
  urlLocal:string;
  mensajeSubida:string = "";
  especialidadInputt:string = "";
  finalizado:boolean = false;
  
  archivo1;
  subirArchivos:boolean = false;
  
  seLogueoAdmin:boolean = false;
  adminLogueado:User = new User();
  tarea: any;

  referencia: AngularFireStorageReference;
  checkArray = [];
  especialidadCheck:any;
  seleccione : boolean = false;

  seleccioneEsp: boolean = false;
  seleccionePac: boolean = false;
  seleccioneAdm: boolean = false;
  ocultar: boolean = false;

  usuarioLogueado:User = new User();
  public formGroup!: FormGroup;

  constructor(
    private authSvc : AuthService, 
    private router: Router,
    private fireSvc: FirebaseService,
    private fb:FormBuilder,
    private storage: AngularFireStorage,
    private alertas: AlertasService,
    
    ) { }

    

    mostrarEspecialista(){

      this.formGroup.get('obraSocial')?.setErrors(null);
        
      
     this.tipo = 'especialista';
     this.seleccioneEsp = true;
     this.seleccionePac = false;
     this.seleccioneAdm = false;
     this.ocultar = true;
    }
    mostrarPaciente(){
      this.tipo = 'paciente' ;
      this.seleccionePac = true ;
      this.seleccioneEsp = false;
      this.seleccioneAdm = false;
      this.ocultar = true;
    }
    mostrarAdmin(){
      this.tipo = 'administrador';
      this.seleccioneAdm = true; 
      this.seleccionePac = false;
      this.seleccioneEsp = false;
      this.ocultar = true;
    }
    mostrarOpciones(){
      this.tipo = 'Seleccione tipo de alta';
      this.seleccioneEsp = false;
      this.seleccionePac = false;
      this.seleccioneAdm = false;
      this.ocultar = false;
    }
  ngOnInit(): void {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    console.log("Se logueo ad>>>"+this.seLogueoAdmin);
    
    if(this.usuarioLogueado != null){
      console.log("usuario admin >>>"+this.usuarioLogueado.admin);
      if(this.usuarioLogueado.admin){
        this.seLogueoAdmin = true;
        this.seleccioneAdm = true;
        this.tipo = "administrador";        
        this.mostrarOpciones();
      }
    }

    this.fireSvc.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
      this.spinner = false;
      this.especialidades = especialidad;        
    });     
    
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',Validators.required], 
      'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni': ['',[Validators.required,Validators.min(11111111),Validators.max(99999999),Validators.minLength(8),Validators.minLength(8)]],
      'obraSocial': ['',[Validators.required]],
      'descripcion': [false],
      'descrArr': this.fb.array([]),      
      'email': ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'password': ['',Validators.required],
      'confirmarPassword': ['',Validators.required],
      'fotoPerfil': ['',Validators.required],
      'captcha': ['',Validators.required],
      'especialidad': ['',],
      'especialidadInput': ['',],
      'fileSource': ['', ],
      'fileSource2': ['', ]
      
    },
    { 
      validator: this.chequearClave('password', 'confirmarPassword')
    });
  }
  prueba3(){
    console.log(this.formGroup.get('value'))
  }
  private chequearArchivos(control: AbstractControl):null | object {
    // console.log(control);
    
    if(this.subirArchivos){
      return {
        habilitado: true
      }
    }
    else{
      return null;
    }
  }
  
  onFileSelectedFoto(event,multiple) {
    const filelist = event.target.files;
    
    if(multiple){
      
      if(filelist.length == 1){
        this.subirArchivos = false;
        this.mensajeSubida = "Seleccione 2 archivos";
        // console.log("1 archivo");
      }
      if(filelist.length != 2){
        // console.log("seleccionar solo 2 archivos");
        this.subirArchivos = false;
        this.mensajeSubida = "Seleccionar SOLO 2 archivos";
      }
      else{
        if(filelist[0] != null ){ 
          this.subirArchivos = true;
          const file = filelist[0];
          this.formGroup.patchValue({
            fileSource: file
          });          
          
          this.mensajeArchivo = `Archivo preparado: ${filelist[0].name}`;
          this.nombreArchivo = this.user.obtenerFechaHora() + " " + filelist[0].name;
          // console.log(this.mensajeArchivo);
          // console.log("name arch:  " + this.nombreArchivo); 

        }
        if(filelist[1] != null){ 
          const file2 = filelist[1]; 
          this.formGroup.patchValue({ fileSource2: file2 });
          this.mensajeArchivo2 = `Archivo preparado: ${filelist[1].name}`;
          this.nombreArchivo2 = this.user.obtenerFechaHora() + " " + filelist[1].name; 
        } 
      } 
    }
    else{ 
      if(filelist[0] != null){
        this.subirArchivos = true;
        const file = filelist[0];
        this.formGroup.patchValue({ fileSource: file });
        this.mensajeArchivo = `Archivo preparado: ${filelist[0].name}`;
        this.nombreArchivo = this.user.obtenerFechaHora() + " " + filelist[0].name;
        console.log("name arch:  " + this.nombreArchivo); 
      }

    }
    
  }
  async subirFoto(){
    
    const archivo1 = this.formGroup.get('fileSource').value;
    this.referencia = this.fireSvc.referenciaCloudStorage(this.nombreArchivo);
    // console.log("f1>>" + this.formGroup.get('fileSource').value);
    // console.log("f2>>" + this.formGroup.get('fileSource2')); 
    /** subo archivo 1 */
    return this.fireSvc.addFile(this.nombreArchivo, archivo1).snapshotChanges().pipe(finalize(() => {
      /** subo archivo 2 */
      if (this.formGroup.get('fileSource2').value != "") { 
        const archivo2 = this.formGroup.get('fileSource2').value;
        let referenciaArchivo2 = this.fireSvc.referenciaCloudStorage(this.nombreArchivo2);
        this.fireSvc.addFile(this.nombreArchivo2, archivo2).snapshotChanges().pipe(finalize(() => {
          referenciaArchivo2.getDownloadURL().subscribe(url => {
            this.downloadURLFoto2 = url; 
            this.user.fotoPerfilDos = this.downloadURLFoto2; 
          });
          this.referencia.getDownloadURL().subscribe(url => {
            this.downloadURLFoto1 = url;
            this.user.fotoPerfil = this.downloadURLFoto1; 
            this.fireSvc.addUser(this.user);
          });

        })).subscribe();

      }
      else{
        this.referencia.getDownloadURL().subscribe(url => {
          this.downloadURLFoto1 = url;
          console.log(this.downloadURLFoto1, this.downloadURLFoto2)
          this.user.fotoPerfil = this.downloadURLFoto1;
          if(this.user.email === 'admin@admin.com'){
            this.user.aprobadoPorAdmin = true;
          }
          this.user.aprobadoPorAdmin = false; 
          this.fireSvc.addUser(this.user);
        }); 
      } 
    })).subscribe();  
  }
  
  async register(){
    this.formGroup.get('obraSocial').setErrors(null); 
    this.user.nombre = this.formGroup.get('nombre').value;
    this.user.apellido = this.formGroup.get('apellido').value;
    this.user.edad = this.formGroup.get('edad').value;
    this.user.dni = this.formGroup.get('dni').value;
    this.user.email = this.formGroup.get('email').value; 
    this.password = this.formGroup.get('password').value;
    this.user.fecha = this.user.obtenerFechaHora();
    this.user.password = this.password; 

    if(this.tipo === "paciente"){
      this.user.aprobadoPorAdmin = true;
      this.user.paciente = true;
      this.user.descripcion = this.formGroup.get('descripcion').value;
      this.user.especialista = false;
      
      
      if(this.downloadURLFoto2 != ""){
        this.user.fotoPerfilDos = this.downloadURLFoto2;
      }
    }
    else if(this.tipo === "especialista"){
      this.user.aprobadoPorAdmin = false;
      this.user.especialista = true;
      this.user.especialista = true;
      this.formGroup.get('obraSocial').setErrors(null);
      
      

      let espAux = new Especialidad();
      if(this.formGroup.get('especialidadInput').value != ""){
        espAux.nombre = this.formGroup.get('especialidadInput').value;
        this.user.descripcion.push(espAux.nombre);
        
      }
      else{
        
        this.user.descripcion = JSON.parse(JSON.stringify(this.checkArray))
        
        // this.user.descripcion = this.formGroup.get('especialidad').value;

      }
    }
    else if(this.tipo === 'administrador'){
      this.user.admin = true;
      this.user.aprobadoPorAdmin = true;
      

    }
    await this.authSvc.register(this.user,this.password).then((result)=>{
      console.log(result);
      this.user.uid = result.user.uid; 
      this.subirFoto().then(()=>{
        console.log("subir foto OK");
      });
    });
    
  }
  chequearClave(controlName: string, matchingControlName: string): null | object{
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
  capturarSelectTipo(){ 
    this.tipo = this.tipo;
  } 

  mostrarAgregarEspecialidad(){
    this.mostrarInputRadioOtro= !this.mostrarInputRadioOtro;
  } 

  agregarEspecialidad(){
    let espAux = new Especialidad();
    espAux.nombre = this.formGroup.get('especialidadInput').value
    espAux.img = "https://st3.depositphotos.com/5520014/17847/v/600/depositphotos_178477642-stock-illustration-specialist-of-medical-sciences-doctor.jpg";
    this.fireSvc.AddEspecialidades(espAux);
    
  }
  capturarRadioEspecialidad(event){
    
    if(event.target.value === "Otra"){
      this.checkArray.forEach((check)=>{
        check = false;
      });
    }
    if(event.target.checked){
      this.checkArray.push(event.target.value);
      this.formGroup.get('especialidad').setValue(JSON.parse(JSON.stringify(this.checkArray)));
    } else {
      let i: number = 0;
      this.checkArray.forEach((item) => {
        console.log(item)
        console.log(event.target.value)
        if (item == event.target.value) {
          this.checkArray.splice(i);
          return;
        }
        if(event.target.value === "Otra"){
          event.target.value = false;
          console.log(this.formGroup.get('descripcion').value);
          this.checkArray.splice(i);
        }
        i++;
      });
    } 
    // console.log(this.checkArray); 
  }
  onCheckChange(e){
    console.log(e);
  } 
  
  mostrarMensajeOk(mensaje:string){
    Swal.fire({
      title: mensaje,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {

      }
    }).then((result) => { 
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Se envio OK')
      }
    })
  }
  mostrarMensajeError(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    })
  }

}
