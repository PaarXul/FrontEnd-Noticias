import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {formatDate} from "@angular/common";
import {NewsService} from "../../../services/news.service";
import {SpaceApi} from "../../../model/SpaceApi";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {FavoritasService} from "../../../services/favoritas.service";
import {pageable} from "../../../model/pageable";

@Component({
  selector: 'app-view-favoritas',
  templateUrl: './view-favoritas.component.html',
  styleUrls: ['./view-favoritas.component.css']
})
export class ViewFavoritasComponent implements AfterViewInit {
  displayedColumns: string[] = ['title','news_site', 'summary', 'published_at','created','actions'];
  noticias:  FavoritasService | undefined;
  data: pageable [] = [];
  siguiente: string = '';

  Search: string = '';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.noticias = new FavoritasService(this._httpClient);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.noticias!.getFavorite(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.Search.trim().toLowerCase()
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalElements;
          this.siguiente = data.next;
          return data.content;

        }),
      )
      .subscribe(data => (
          this.data = data
        )

      );
  }

  applyFilter(event: Event) {
    this.Search = (event.target as HTMLInputElement).value;
    if (this.Search.length > 3){
      this.ngAfterViewInit();
    }else if(this.Search.length == 0){
      this.ngAfterViewInit();
    }
  }

  formatDate(date: Date | string): string {
    let dateObj = date;
    // Convert strings to Date object if a string is passed
    if (typeof date === 'string') {
      dateObj = new Date(date);
    }

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      throw new Error("Expected parameter to be a valid Date object or string that can be converted to date.");
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Intl.DateTimeFormat('default', options).format(dateObj).replace(/\s/g,' ');
  }

  delete(row: { id: Number; }) {
    this.noticias?.deleteFavorite(row.id).subscribe(
      (data: any) => {
        console.log(data);
        this.ngAfterViewInit();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }



}
