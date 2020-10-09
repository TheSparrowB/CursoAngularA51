import { Component, OnInit } from '@angular/core';
import * as countries from "../../assets/json/countries.json";
import { Country } from '@gx/models';
import { SlicePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [UpperCasePipe, SlicePipe]
})
export class CountriesComponent implements OnInit {

  selected: Country;
  countries: Country[];
  total = 123456.789;

  constructor(private upperCasePipe: UpperCasePipe,
              private slicePipe: SlicePipe) {
    this.selected = countries[9];
    //.find(c => c.name == "Guyana");
  }

  ngOnInit(): void {

  }



  send(name: string){
    name = this.upperCasePipe.transform(name);
    console.log(name);

    name = this.slicePipe.transform(name, 0, 3);
    console.log(name);
  }

}
