import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../interfaces';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  //#region GLOBAL VARIABLES
  private _dish;

  get dishBase(): Dish{
    return this._dish;
  }

  @Input() set dishBase(dish: Dish){
    this._dish = dish;   
  };

  @Output() onChangeEvent: EventEmitter<Dish> = new EventEmitter();
  //#endregion


  constructor() { }


  ngOnInit(): void {
  }


  addDish(){
    this.onChangeEvent.emit(this.dishBase);
  }

}
