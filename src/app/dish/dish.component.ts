import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../interfaces/interface.barrel';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  private _dish;
  get dish(): Dish{
    return this._dish;
  }
  @Input() set dish(dish: Dish){
    console.log(dish);
    if(!dish){
      dish = { name: "Hamburguesa", ingredients: [{ name: "Papa", quantity: 1}, 
                                                        { name: "Carne", quantity: 1},
                                                        { name: "Lechuga", quantity: 1}]}
    }

    dish.name = this.generateName(dish.name);
    
    let total = 0;
    dish.ingredients.forEach(ing => {
      total += ing.quantity;
    });
    dish.totalIngredients = total;
    this._dish = dish;
   
  };

  constructor() { }

  ngOnInit(): void {
  }


  generateName(name: string) : string{
    return `El nombre es: ${name}`;
  }

}
