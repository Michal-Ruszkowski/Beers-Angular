import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { finalize, forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private readonly pageSize = 20;
  private page = 1;
  loading = false;

  constructor(private http: HttpClient) { }

  getBeers(): Observable<any> {
    this.loading = true;
    const url = `https://api.punkapi.com/v2/beers?per_page=${this.pageSize}&page=${this.page}`;
    return this.http.get(url)
      .pipe(finalize(() => {
          this.loading = false;
          this.page++;
        })
      );
  }

  getBeerById(id: number): Observable<any> {
    const url = `https://api.punkapi.com/v2/beers/${id}`;
    return this.http.get(url)
  }

  getRandomBeers(): Observable<any[]> {
    const beers: Observable<any>[] = [];
    for (let i = 0; i < 3; i++) {
      beers.push(this.http.get<any>('https://api.punkapi.com/v2/beers/random'));
    }
    return forkJoin(beers);
  }
}
