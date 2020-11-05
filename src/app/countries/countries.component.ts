import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country, Post } from '@gx/models';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [UpperCasePipe, SlicePipe],
})
export class CountriesComponent implements OnInit, OnDestroy {
  code = 0;
  selected: Country;
  total = 123456.789;

  private destroyAll$: Subject<void> = new Subject<void>();

  constructor(
    private upperCasePipe: UpperCasePipe,
    public countriesService: CountriesService,
    private slicePipe: SlicePipe,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    // EN ESTE CICLO VERIFICAMOS SI EL OBSERVABLE ESTA CERRADO
    let service = this.countriesService.getList().subscribe(
      (countries) => {
        console.log('Dentro de la suscripción');
        console.log(service.closed);

        console.log(countries[7].name);
      },
      (err) => {},
      () => {
        console.log('Se terminó de listar.');
        console.log(service.closed);
      }
    );

    console.log('Se ejecuta antes');
    console.log(service.closed);

    setTimeout((t) => {
      console.log(service.closed);
    }, 4000);
  }

  getInfo(code: number): void {
    this.countriesService.getCountry(code);
  }

  send(name: string) {
    name = this.upperCasePipe.transform(name);
    console.log(name);

    name = this.slicePipe.transform(name, 0, 3);
    console.log(name);
  }

  ngOnDestroy(): void {
    this.destroyAll$.next();

    this.destroyAll$.complete();

    this.destroyAll$.unsubscribe();
  }

  /******************************************************************************************************/
  //#region POST
  addPost(): void {
    this.app.bloquearVentana();

    const postBase: Post = {
      userId: 1,
      title: 'Llegó el lechero',
      body: 'LMAO',
    };

    this.countriesService.addPost(postBase).subscribe(
      (res) => {
        this.app.mostrarMensajeExito(
          `Se agregó el post ${res.id} exitosamente.`
        );
        this.app.desbloquearVentana();
      },
      (err) => {
        console.error(err);
        this.app.desbloquearVentana();
      }
    );
  }

  putPost(): void {
    this.app.bloquearVentana();

    const postAlter: Post = {
      id: 1,
      userId: 1,
      title: 'Isabelle',
      body: 'Las pelotas',
    };

    this.countriesService.putPost(postAlter).subscribe(
      (res) => {
        this.app.mostrarMensajeExito(`Post actualizado exitosamente.`);
        this.app.desbloquearVentana();
      },
      (err) => {
        console.error(err);
        this.app.desbloquearVentana();
      }
    );
  }

  patchPost(): void {
    this.app.bloquearVentana();

    const patchPost: Post = {
      id: 1,
      title: 'Y fumo porro y porro y fumo y corro igual',
    };

    this.countriesService.patchPost(patchPost).subscribe(
      (res) => {
        this.app.mostrarMensajeExito(
          `Título del post actualizado exitosamente.`
        );
        this.app.desbloquearVentana();
      },
      (err) => {
        console.error(err);
        this.app.desbloquearVentana();
      }
    );
  }

  deletePost(): void {
    this.app.bloquearVentana();

    const deletePost: Post = {
      id: 1,
    };

    this.countriesService.deletePost(deletePost).subscribe(
      (res) => {
        this.app.mostrarMensajeExito(
          `Post eliminado, destruido y desintegrado exitosamente.`
        );
        this.app.desbloquearVentana();
      },
      (err) => {
        console.error(err);
        this.app.desbloquearVentana();
      }
    );
  }
  //#endregion POST
  /******************************************************************************************************/
}
