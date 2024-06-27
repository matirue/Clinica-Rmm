import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../clases/user';

@Pipe({
  name: 'medico'
})
export class MedicoPipe implements PipeTransform {

  transform(value: User, items: any): any {
    if(!value)return items;
      if(!items)return value;
      
      // console.log(items)
      // console.log(value)
      return value.nombre + " " +value.apellido;
      
  }

}
