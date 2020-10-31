import { Component, OnDestroy, OnInit } from '@angular/core';
//import * as countries from "../../assets/json/countries.json";
import { Country } from '@gx/models';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [UpperCasePipe, SlicePipe]
})
export class CountriesComponent implements OnInit, OnDestroy {

  code = 0;
  selected: Country;
  //countries: Country[];
  total = 123456.789;

  private destroyAll$: Subject<void> = new Subject<void>();

  constructor(private upperCasePipe: UpperCasePipe,
              public countriesService: CountriesService,
              private slicePipe: SlicePipe) {
    //this.selected = countries[9];
    //.find(c => c.name == "Guyana");
  }

  ngOnInit(): void {
    //this.countriesService.getList().subscribe();

    //EL HTTPSERVICE DESUSCRIBE SUS SUSCRIPCIONES AUTOMÁTICAMENTE XP
    /*.pipe(
      takeUntil(this.destroyAll$)
    )*/

    let service = this.countriesService.getList()
    .subscribe(countries => {
      console.log("Dentro de la suscripción");
      console.log(service.closed);

      console.log(countries[7].name);
    },
    err => {

    },
    () => {
      console.log("Se terminó de listar.");
      console.log(service.closed);
    });

    console.log("Se ejecuta antes");
    console.log(service.closed);

    setTimeout(t => {
      console.log(service.closed);
    }, 4000);
    
  }


  getInfo(code: number){
    this.countriesService.getCountry(code);
  }


  send(name: string){
    name = this.upperCasePipe.transform(name);
    console.log(name);

    name = this.slicePipe.transform(name, 0, 3);
    console.log(name);
  }


  ngOnDestroy(){
    this.destroyAll$.next();

    this.destroyAll$.complete();

    this.destroyAll$.unsubscribe();
  }


}
