import { Component, OnInit } from '@angular/core';
import { Dish } from '../interfaces/interface.barrel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  name = "Bryan";
  dish: Dish;

  dishes: Dish[] = [
    { name: "Chanfainita", ingredients: [{ name: "Papa", quantity: 2}, 
                                         { name: "Bofe", quantity: 1}]},
    { name: "Arroz con Pollo", ingredients: [{ name: "Arroz", quantity: 1}, 
                                         { name: "Llopo", quantity: 4}]}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
