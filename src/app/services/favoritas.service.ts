import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable} from "rxjs";
import {content} from "../model/content";

@Injectable({
  providedIn: 'root'
})
export class FavoritasService {

  constructor(private http: HttpClient) {
  }

  public getFavorite(sort: string, order: SortDirection, page: number, pageOptions: number, Search: string): Observable<any> {
    const href = 'http://localhost:8081/favoritos';
    //let resultadoIndex = page * pageOptions;
    let order2 = '';
    if (order == 'desc') {
      order2 = 'desc';
    } else {
      order2 = 'asc';
    }
    return this.http.get(`${href}/title=${Search}&order=${order2}&page=${page}&size=${pageOptions}/`);
  }


  public postFavorite(content : any []): Observable<any> {
    const href = 'http://localhost:8081/favoritos/';
    return this.http.post(`${href}`, content);
  }

  public deleteFavorite(id: Number): Observable<any> {
    const href = 'http://localhost:8081/favoritos';
    return this.http.delete(`${href}/${id}`);
  }


}
