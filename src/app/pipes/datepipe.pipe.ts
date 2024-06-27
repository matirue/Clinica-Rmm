import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: unknown, ...args: unknown[]): unknown {
    let s=new Date();
    
    let x=this.datePipe.transform(s,"yyyy-MM-dd")
    return x;
  }

}
