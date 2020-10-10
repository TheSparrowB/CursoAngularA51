import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: string): string {
    console.log("sancho el pajarraco: " + value);
    if(!value){
      return ':D';
    }
    return value;
  }

}
