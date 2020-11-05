import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '@gx/models';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retry, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _dishCart: Dish[] = [];

  constructor(private http: HttpClient) {}

  public get cart(): Dish[] {
    return this._dishCart;
  }

  public set cart(cart: Dish[]) {
    this._dishCart = cart;
  }

  getDishes(): Observable<Dish> {
    return this.http.get('assets/json/dishes.json').pipe(
      // retry(3)       ESTE METODO SIRVE PARA INTENTAR NUEVAMENTE LA LLAMADA
      retryWhen((err) => {
        let retries = 3;
        return err.pipe(
          delay(1000),
          mergeMap((err1) => {
            if (retries-- > 0) {
              return of(err1);
            } else {
              return throwError(err);
            }
          })
        );
      })
    );
  }

  addDish(dish: Dish): void {
    const index = this._dishCart.findIndex((m) => m.id === dish.id);

    if (index !== -1) {
      this._dishCart[index].quantity = this._dishCart[index].quantity + 1;
    } else {
      dish.quantity = 1;
      this._dishCart.push(dish);
    }
  }

  removeDish(dish: Dish): void {
    const index = this._dishCart.findIndex((m) => m.id === dish.id);

    if (dish.quantity === 1) {
      this._dishCart.splice(index, 1);
    } else {
      this._dishCart[index].quantity = this._dishCart[index].quantity - 1;
    }
  }

  getTotalPrice(): number {
    let precioFinal = 0;
    precioFinal = this._dishCart.reduce(
      (sum, current) => sum + current.quantity * current.price,
      0
    );

    return precioFinal;
  }
}
