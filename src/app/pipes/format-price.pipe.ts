import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: number): string {
    return `$${Math.round(value).toLocaleString('es-CL').replace(/,/g, '.')}`;
  }
}
