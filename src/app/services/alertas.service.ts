import { Injectable } from '@angular/core';
import Swal from'sweetalert2';
import { Historia } from '../clases/historia';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  public reenvioEmail:boolean = false;
  public confirmoTurno:boolean = false;
  constructor() { }
  async mostrarAlertaConfirmacionEmail(mensaje:string,titulo:string,mensajeConfirmed:string){
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reenviar email de verificación'
    });
    if (result.isConfirmed) {
      Swal.fire(
        'Enviado!',
        mensajeConfirmed,
        'success'
      );
      this.reenvioEmail = true;
    }
    else {
      this.reenvioEmail = false;

    }
    return result;
  }
  mostraAlertaSimple(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    })
  }
  mostraAlertaSimpleSuccess(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
    })
  }
  mostraAlertaSimpleSinIcono(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      title: titulo,
      text: mensaje,
    })
  }
  public async mostraAlertaTurno(mensaje:string,titulo:string) {
    // console.log(mensaje)
    let retorno = false;
    let result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    })

      if (result.isConfirmed) {
        console.log(result)
        Swal.fire(
          'Turno confirmado',
          'El turno ha sido tomado',
          'success'
        )
        this.confirmoTurno = true;
      }
      else{
        this.confirmoTurno= false;
      }
    return result;
  }

  public async mostraAlertaInput(titulo:string,mensaje:string){
    // console.log(mensaje)
    
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: titulo,
      inputPlaceholder: mensaje,
      inputAttributes: {
        'aria-label': mensaje
      },
      showCancelButton: true
    })
    console.log(text);
    
    return text;
  }
  mostrarAlertaHistoria(hist: Historia){
  
    let historiaHtml= "<ul class='list-unstyled mt-3 mb-4'><p><strong>Altura:</strong> " + hist.altura+"</p><p><strong>Peso:</strong> " + hist.peso+"</p><p><strong>Temperatura:</strong> "+ hist.altura+"</p><p><strong>Presion:</strong> " + hist.presion+"</p><p><strong> " + hist.clave+":</strong> " + hist.valor+"</p><p><p><strong> " + hist.clave2+":</strong> " + hist.valor2+"</p></ul>";

    Swal.fire({
      title: '<strong>Historia clinica</strong>',
      icon: 'info',
      html: historiaHtml,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Ok',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }
  
}
