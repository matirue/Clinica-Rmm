import { Especialidad } from './../clases/especialidad';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Turnos } from '../clases/turnos';
import { BajaUsuario } from '../clases/bajaUsuario';
import { EstadoTurno } from '../clases/estado-turno';
import { Historia } from '../clases/historia';
import { AlertasService } from './alertas.service';
import { Logs } from '../clases/logs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public formCompleted: boolean = false;
  private dbpath = '/usuarios';
  private dbpathEspecialidad = '/especialidades';
  private dbpathTurno = '/turnos';
  private dbPathBajas = '/bajas';
  private dbPathEstadoTurnos = '/estadoTurnos';
  private dbPathHistoria = '/historiaClinica';
  private dbPathLogs = '/logs'; 
  usuariosCollection: AngularFirestoreCollection<User>;
  especialidadCollection: AngularFirestoreCollection<Especialidad>;
  turnosCollection: AngularFirestoreCollection<Turnos>;
  bajasCollection: AngularFirestoreCollection<BajaUsuario>;
  estadosCollection: AngularFirestoreCollection<EstadoTurno>;
  historiaCollection: AngularFirestoreCollection<Historia>;
  logsCollection: AngularFirestoreCollection<Logs>; 



  usuariosDoc: AngularFirestoreDocument<User> | undefined;
  turnosDoc: AngularFirestoreDocument<Turnos> | undefined;
  estadosDoc: AngularFirestoreDocument<EstadoTurno> | undefined;
  historiaDoc: AngularFirestoreDocument<Historia> | undefined;
  public usuarios: Observable<User[]>;
  public especialidades: Observable<Especialidad[]>;
  public turnos: Observable<Turnos[]>;
  public bajas: Observable<BajaUsuario[]>;
  public estados: Observable<EstadoTurno[]>;
  public historias: Observable<Historia[]>;
  public logs: Observable<Logs[]>; 
  constructor(public db: AngularFirestore,
    private storage : AngularFireStorage,
    private alerta: AlertasService) {
    
    // this.mensajes = db.collection<Mensaje>('mensajes').valueChanges();

    /** Usuarios */
    this.usuariosCollection = db.collection(this.dbpath);
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    
    /** especialidades */
    this.especialidadCollection = db.collection(this.dbpathEspecialidad);
    this.especialidades = this.especialidadCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Especialidad;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    /** turnos */

    this.turnosCollection = db.collection(this.dbpathTurno);
    this.turnos = this.turnosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Turnos;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    /** baja usuarios */
    this.bajasCollection = db.collection(this.dbPathBajas);
    this.bajas = this.bajasCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as BajaUsuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    /**estados */
    this.estadosCollection = db.collection(this.dbPathEstadoTurnos);
    this.estados = this.estadosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as EstadoTurno;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    /** historia clinica */
    this.historiaCollection = db.collection(this.dbPathHistoria);
    this.historias = this.historiaCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Historia;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    /** logs */
    this.logsCollection = db.collection(this.dbPathLogs);
    this.logs = this.logsCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Logs;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    

   }

   public addFile(nombreArchivo: string, datos: any) {
    return this.storage.upload('fotosPerfil/'+nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref('fotosPerfil/' + nombreArchivo);
  }
   
  getAllFiles() {
    let asd = this.storage.ref('fotosPerfil/').listAll();
    return asd;
  }

   getAllUsers(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.usuarios;
   }
  //  getAll(): AngularFirestoreCollection<Mensaje>{
  //   return this.mensajesColecction;
  // }
  addUser(usuario: User){
    
    return this.usuariosCollection.add(JSON.parse( JSON.stringify(usuario)));
    // return this.mensajesColecction.add({...mensaje});
  }
  consultarFirebase(){
    this.usuariosCollection.ref.where('asd','==','d');
  }
  AddEspecialidades(especialidad: Especialidad){
    return this.especialidadCollection.add(JSON.parse( JSON.stringify(especialidad)));

  }
  getEspecialidades(){
    return this.especialidades;
   }
  

   /** Bajas */
   /** Antes de dar la baja modificar y poner baja: true */
  addBaja(baja: BajaUsuario,usuario: User){
    this.updateUsuario(usuario);
    
    return this.bajasCollection.add(JSON.parse( JSON.stringify(baja)));

  }
  getBajas(){
    return this.bajas;
   }

   /** Usuarios */
  deleteUser(usuario: User){
    this.usuariosDoc = this.db.doc(`mensajes/${usuario.uid}`);
    this.usuariosDoc.delete();
  }
  updateUsuario(usuario: User){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.uid}`);
    return this.usuariosDoc.update(usuario);
  }

  //#region /*** Turnos */
  getAllTurnos(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.turnos;
   }
  addTurno(turno: Turnos){

    return this.turnosCollection.add(JSON.parse( JSON.stringify(turno)));
  // return this.mensajesColecction.add({...mensaje});
  }
  updateTurno(turno: Turnos){
    this.turnosDoc = this.db.doc(`turnos/${turno.id}`);
    return this.turnosDoc.update(turno);
  }
  //#endregion
  
  //#region Estado de los turnos
  getAllEstados(){
    return this.estados;
  }
  /** Modifico el estado del turno updateandolo y creo coleccion nueva de estado de ese turno */
  addEstado(estado: EstadoTurno, turno: Turnos){
    this.updateTurno(turno);

    return this.estadosCollection.add(JSON.parse(JSON.stringify(estado)));
  }
  updateEstado(estado: EstadoTurno){
    this.estadosDoc = this.db.doc(`estadoTurnos/${estado.id}`);
    return this.estadosDoc.update(estado);
  }

  //#endregion


  //#region Historia Clinica
  addHistoria(historia: Historia){
    try{
      return this.historiaCollection.add(JSON.parse(JSON.stringify(historia)));

    }
    catch(e){
      this.alerta.mostraAlertaSimple(e,'Error');

      return e;
    }

  }
  getAllHistorias(){
    return this.historias;
  }
  updateHistorias(historia: Historia){
    this.historiaDoc = this.db.doc(`estadoTurnos/${historia.id}`);
    return this.historiaDoc.update(historia);
  }
  //#endregion

  //#region
  
  addLog(usuario: User){
    let log: Logs = new Logs();
    log.usuario = usuario;
    log.dia = log.obtenerFecha();
    log.hora = log.obtenerHora();
    
    try{
      return this.logsCollection.add(JSON.parse(JSON.stringify(log)));

    }
    catch(e){
      console.log(e);

      return e;
    }

  }
  getAllLogs(){
    return this.logs;
  }
  ////#endregion
}
