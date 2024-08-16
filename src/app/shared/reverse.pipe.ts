import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): unknown {
    let arr = [];
    arr = [...value];
    return arr.reverse().toString().replaceAll(',', '');
  }
}
