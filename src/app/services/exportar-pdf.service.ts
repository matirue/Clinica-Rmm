import { Injectable } from '@angular/core';
import jsPDF, { jsPDFOptions } from 'jspdf';
 import 'jspdf-autotable';
import { autoTable, RowInput } from 'jspdf-autotable';
import { EstadoTurno } from '../clases/estado-turno';
import { User } from '../clases/user';
import { Logs } from '../clases/logs';

const imgBase64 = 'data:image/png;base64,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';


@Injectable({
  providedIn: 'root'
})
export class ExportarPdfService {

  usuarioLogueado: User;
  constructor() { 
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    // console.log("pdf us log"+this.usuarioLogueado)

  }

  
  exportarPdf(estados: EstadoTurno[]){
    
    const doc = new jsPDF();
    var width = 10;
    var height = 10;
    doc.addImage(imgBase64,'png',180,3,width,height);
    let auxData= [];
    // doc.text("Historial Clinico de: "+ this.usuarioLogueado.apellido  + ", " + this.usuarioLogueado.nombre, 10, 10);
    doc.text("Clinica-RMM Historial Clinico", 10, 10);
    
    
    (doc as jsPDF & { autoTable: autoTable }).autoTable({ head: [[
        'Especialidad',
        'Reseña',        
        'Medico',
        'Fecha',
        'Hora',
    ]]});

    estados.forEach(d => {

      
      let objAux:any = {
        especialidad: d.especialidad,
        resenia: d.resenia,        
        apellidoMedico: d.especialista.apellido + ", " + d.especialista.nombre,
        fechaAtencion: d.fecha,
        horaAtencion: d.hora,  

      }
      auxData.push(objAux);

      (doc as jsPDF & { autoTable: autoTable }).autoTable({ body: [objAux] as unknown as RowInput[],
        columnStyles: 
        {
          0: {
            cellWidth: 35
          },
          1: {
            cellWidth: 55
          }, 
          2: {
            cellWidth: 40
          },
          3: {
            cellWidth: 30
          },
          4: {
            cellWidth: 20
          },
        }
        
      })
    });
    doc.save('Historial_Clinico.pdf')
  } 

  exportarLogs(logs: Logs[]) {
    const doc = new jsPDF(); 
    var width = 10;
    var height = 10;
    doc.addImage(imgBase64,'png',180,3,width,height);
    let auxData= [];
    doc.text("Clinica-RMM Logs usuarios", 10, 10);

    const body = logs.map(log => ([
      log.usuario?.nombre || 'N/A',
      log.usuario?.apellido || 'N/A',
      log.usuario?.email || 'N/A',
      log.dia || 'N/A',
      log.hora || 'N/A'
    ]));

    (doc as jsPDF & { autoTable: autoTable }).autoTable({
      head: [['Nombre', 'Apellido', 'Email', 'Día de Ingreso', 'Hora de Ingreso']],
      body,
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 35 },
        2: { cellWidth: 55 },
        3: { cellWidth: 30 },
        4: { cellWidth: 20 },
      },
      startY: 20
    });

    doc.save('Logs_Usuarios.pdf');
  }
  
}
