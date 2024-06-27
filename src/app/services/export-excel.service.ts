import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { EstadoTurno } from '../clases/estado-turno';
import { User } from '../clases/user';
const imgBase64 = 'data:image/png;base64,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';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  
  exportExcel(excelData) {
    console.log(excelData);
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Listado turnos');


    

    //Add Row and formatting
    worksheet.mergeCells('C1', 'F4');
    let titleRow = worksheet.getCell('C1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('G1:H4');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('G1');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }

    //Add Image
    
    let myLogoImage = workbook.addImage({
      base64: imgBase64,
      extension: 'png',
    });
    worksheet.mergeCells('A1:B4');
    worksheet.addImage(myLogoImage, 'A1:B4');
    
    // worksheet.addImage(myLogoImage, 'A1:B4');

    //Blank Row 
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    console.log(data);
    
    data.forEach(d => {
      console.log(d);

      // 'Especialidad',
      //   'Reseña',
      //   'Nombre medico',
      //   'Apellido medico',
      //   'Email de medico',
      //   'Dni de medico',
      //   'Edad de medico',
      //   'Fecha de atencion',
      //   'Hora de atencion',
      //   'Estado de atencion',
      //   'Nombre Paciente',
      //   'Apellido Paciente',
      //   'Dni paciente',
      //   'Edad paciente',

        let objAux:any = {
          especialidad: d.especialidad,
          resenia: d.comentarioMedico,
          nombreMedico: d.especialista.nombre,
          apellidoMedico: d.especialista.apellido,
          emailMedico: d.especialista.email,
          dniMedico: d.especialista.dni,
          edadMedico: d.especialista.edad,
          fechaAtencion: d.fecha,
          horaAtencion: d.hora,
          estado: d.estado,
          nombrePaciente: d.paciente.nombre,
          apellidoPaciente: d.paciente.apellido,
          paciente: d.paciente.dni,
          edadPaciente: d.paciente.edad,


          
        }
        console.log(objAux);

        let row = worksheet.addRow(Object.values(objAux));
        console.log(row.values);
      // }
      // else{
      //   let objAux:User = {
      //     nombre: d.nombre,
      //     apellido: d.apellido,
      //     baja: d.baja,
      //     dni: d.dni,
      //     edad: d.edad,
      //     email: d.email,
      //     fecha: d.fecha,
      //     fotoPerfil: d.fotoPerfil,
      //     fotoPerfilDos: d.fotoPerfilDos,
      //     especialista: d.especialista,
      //     uid: d.uid,
      //   }
  
      //   let row = worksheet.addRow(Object.values(objAux));
      //   console.log(row.values);
      // }

    }
  );

    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);

    //Footer Row
    // let footerRow = worksheet.addRow([' ' + date]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }
  
}
