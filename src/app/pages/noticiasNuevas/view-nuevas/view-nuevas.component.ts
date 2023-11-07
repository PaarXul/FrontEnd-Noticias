import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from "../../../services/news.service";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule, SortDirection} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {catchError, map, merge, Observable, of, startWith, switchMap} from "rxjs";
import {SpaceApi} from "../../../model/SpaceApi";

@Component({
  selector: 'app-view-nuevas',
  templateUrl: './view-nuevas.component.html',
  styleUrls: ['./view-nuevas.component.css']
})
export class ViewNuevasComponent implements AfterViewInit {
  displayedColumns: string[] = ['title','news_site', 'summary', 'published_at'];
  noticias:  NewsService | undefined;
  data: SpaceApi [] = [];
  siguiente: string = '';

  Search: string = '';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.noticias = new NewsService(this._httpClient);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.noticias!.getNews(
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

        this.resultsLength = data.count;
        this.siguiente = data.next;
        return data.results;

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

}
