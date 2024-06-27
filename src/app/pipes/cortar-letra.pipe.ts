import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCortarLetra'
})
export class CortarLetraPipe implements PipeTransform {

  transform(value: string, items: any ): any {
    if(!value)return items;
      if(!items)return value;
      
      // console.log(items)
      // console.log(value)
      if(items.length == 1){
        value = 'Medico';
        return value;
      }
      else if(items.length > 1){
        value = 'Medicos';
        return value;
      }
  }

}
