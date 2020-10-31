import { Component, OnInit } from '@angular/core';
import { Customer, Dish } from '@gx/models';
import * as dishes from "../../assets/json/dishes.json";
import { AppComponent } from '../app.component';
import { MenuService } from '../utils/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  name = "Bryan";
  dishList: Dish[];
  menuList: Dish[] = [];
  precioTotal: number = 0;

  constructor(
    private menuService: MenuService,
    private app: AppComponent
  ) { }

  ngOnInit(): void {
    this.dishList = dishes.dishes;
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


  send(){
    let customer : Customer = {
      name: name,
      level: "Regular"
    }

    this.menuService.customer = customer;

    if(this.menuList.length==0){
      this.app.mostrarMensajeError("Se necesita al menos un plato en la carta antes de procesar el pago.");
      return;
    }

    let preciazo = this.menuService.check(this.menuList);
    this.precioTotal = preciazo;

  }

}
