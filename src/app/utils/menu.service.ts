import { Injectable } from '@angular/core';
import { Customer, Dish } from '@gx/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  customer: Customer;

  constructor() { }

  check(dishes: Dish[]): number{
    let precioFinal = 0;

    for(let i=0; i<dishes.length; i++){
      precioFinal += (dishes[i].price*dishes[i].quantity);
    }

    return precioFinal;

  }
}
