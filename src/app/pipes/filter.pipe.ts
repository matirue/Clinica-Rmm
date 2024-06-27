import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {

  
  transform(items: any, value: string): any {
    if(!value)return items;
      if(!items)return value;
      
      value = value.toLowerCase();
      return items.filter((data)=>{
        // data.especialidad = data.especialidad.toLowerCase();
        
        // // console.log(value)
        // data.especialista.nombre = data.especialista.nombre.toLowerCase();
        // data.especialista.apellido = data.especialista.apellido.toLowerCase();
        // if(data.especialidad.includes(value) || data.especialista.nombre.includes(value) || data.especialista.apellido.includes(value)){
        //   console.log(data)
        //   return JSON.stringify(data).toLowerCase().includes(value);
        // }
        // else{
        //   return null;
        // }
        return JSON.stringify(data).toLowerCase().includes(value);
      });
  }

}
