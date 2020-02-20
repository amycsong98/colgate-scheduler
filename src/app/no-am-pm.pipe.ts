import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noAmPm'
})
export class NoAmPmPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(':').slice(0, 2).join(':');
  }
}
