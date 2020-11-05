import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Post } from '@gx/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService implements OnDestroy {
  selectedCountry$: Subject<Country> = new Subject<Country>();
  error$: Subject<string> = new Subject<string>();

  private url = 'https://restcountries.eu/rest/v2/all';
  private urlPostApi = 'https://jsonplaceholder.typicode.com/';

  private destroyAll$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  getList(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }

  getCountry(code: number): void {
    const ds = this.http
      .get(this.url)
      .pipe(takeUntil(this.destroyAll$))
      .subscribe(
        (countries) => {
          if (countries[code]) {
            this.error$.next(null);
            this.selectedCountry$.next(countries[code]);
          } else {
            this.selectedCountry$.next(null);
            this.error$.next('Este registro no existe.');
          }
        },
        (err) => {
          ds.unsubscribe();
        },
        () => {
          ds.unsubscribe();
        }
      );
  }

  /******************************************************************************************************/
  //#region POST
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.urlPostApi}posts`, post);
  }

  putPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.urlPostApi}posts/${post.id}`, post);
  }

  patchPost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.urlPostApi}posts/${post.id}`, {
      title: post.title,
    });
  }

  deletePost(post: Post): Observable<unknown> {
    return this.http.delete<Post>(`${this.urlPostApi}posts/${post.id}`);
  }
  //#endregion POST
  /******************************************************************************************************/

  ngOnDestroy(): void {
    this.destroyAll$.next();
    this.destroyAll$.complete();
    this.destroyAll$.unsubscribe();
  }
}
