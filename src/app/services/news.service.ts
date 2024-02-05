import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  public getNews(sort: string, order: SortDirection, page: number, pageOptions:number, Search:string): Observable<any> {
    const href = 'https://api.spaceflightnewsapi.net/v4/articles/';
    let resultadoIndex = page*pageOptions;
    let order2 = '';
    if(order == 'desc'){
      order2 = '-';
    }else{
      order2 = '';
    }
    return this.http.get(`${href}?limit=${pageOptions}&offset=${resultadoIndex}&ordering=${order2}${sort}&search=${Search}`);
  }
}
