import { Component, OnInit } from '@angular/core';
import { Customer, Dish } from '@gx/models';
import { AppComponent } from '../app.component';
import { MenuService } from '../utils/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishList: Dish[];
  cartList: Dish[];
  precioTotal = 0;

  constructor(private menuService: MenuService, private app: AppComponent) {}

  ngOnInit(): void {
    this.getMenuList();
    this.cartList = this.menuService.cart;
  }

  getMenuList(): void {
    this.menuService.getDishes().subscribe((res: any) => {
      this.dishList = res.dishes;
    });
  }

  updateMenu(dish: Dish): void {
    this.menuService.addDish(dish);
  }

  removeDish(dish: Dish): void {
    this.menuService.removeDish(dish);
  }

  send(): void {
    // this.menuService.customer = customer;

    if (this.cartList.length === 0) {
      this.app.mostrarMensajeError(
        'Se necesita al menos un plato en la carta antes de procesar el pago.'
      );
      return;
    }

    let preciazo = this.menuService.getTotalPrice();
    this.precioTotal = preciazo;
  }
}
