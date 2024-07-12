import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  // Convierte 0 a 12 para la hora 12 AM/PM
  transform(value: string): string {
    if (!value) return value;
    
    let [hours, minutes] = value.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

}
