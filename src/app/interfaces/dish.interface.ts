import { Ingredient } from './ingredient.interface';

export interface Dish {
    id?: number;
    name?: string;
    ingredient?: Ingredient[];
    rating?: number;
    category?: string;
    price?: number;
    spiciness?: number;
    inventoryStatus?: string;
    image?: string;
    quantity?: number;
  }
  