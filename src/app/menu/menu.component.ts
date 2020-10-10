import { Component, OnInit } from '@angular/core';
import { Dish } from '@gx/models';
import * as dishes from "../../assets/json/dishes.json";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishList: Dish[];
  menuList: Dish[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dishList = (dishes as any).default;
  }


  updateMenu(dish: Dish){
    //PRIMERO BUSCAMOS SI EL PLATO YA EXISTE EN EL MENÚ
    let index = this.menuList.findIndex(m=>m.id == dish.id);
    
    if(index != -1){
      this.menuList[index].quantity = this.menuList[index].quantity + 1;
    }
    else{
      dish.quantity = 1;
      this.menuList.push(dish);
    }
  }


  removeDish(dish: Dish){
    let index = this.menuList.findIndex(m=>m.id == dish.id);
    
    if(dish.quantity == 1){
      this.menuList.splice(index, 1);
    }
    else{
      this.menuList[index].quantity = this.menuList[index].quantity - 1;
    }
  }

}
