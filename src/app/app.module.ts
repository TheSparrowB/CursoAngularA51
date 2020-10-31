import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FilesizePipe, EmptyPipe } from '@gx/pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { DishComponent } from './dish/dish.component';
import { CountriesComponent } from './countries/countries.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DishPipe } from './pipes/dish.pipe';
import { IngredientPipe } from './pipes/ingredient.pipe';
import { BoxShadowDirective } from './directives/box-shadow.directive';
import { DetailComponent } from './countries/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    DishComponent,
    CountriesComponent,
    FilesizePipe,
    EmptyPipe,
    DishPipe,
    IngredientPipe,
    BoxShadowDirective,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CardModule,
    ButtonModule,
    RatingModule,
    TableModule,
    ScrollingModule,
    ToastModule,
    PanelModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
