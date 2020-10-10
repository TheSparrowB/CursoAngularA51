import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '@gx/models';

@Pipe({
  name: 'dish',
  pure: false
})
export class DishPipe implements PipeTransform {

  transform(dish: Dish): string {
    let transformedText = `${dish.name} => ${dish.quantity}` + (dish.quantity == 1 ? " unidad." : " unidades.");
    return transformedText;
  }

}
