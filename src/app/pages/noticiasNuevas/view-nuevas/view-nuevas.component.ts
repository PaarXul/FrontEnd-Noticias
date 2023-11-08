import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from "../../../services/news.service";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule, SortDirection} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {catchError, map, merge, Observable, of, startWith, switchMap} from "rxjs";
import {SpaceApi} from "../../../model/SpaceApi";
import {FavoritasService} from "../../../services/favoritas.service";
import {content} from "../../../model/content";

@Component({
  selector: 'app-view-nuevas',
  templateUrl: './view-nuevas.component.html',
  styleUrls: ['./view-nuevas.component.css']
})
export class ViewNuevasComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'news_site', 'summary', 'published_at', 'actions'];
  noticias: NewsService | undefined;
  favorite: FavoritasService | undefined;

  favoriteData: any = [];


  data: SpaceApi [] = [];
  siguiente: string = '';

  Search: string = '';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient) {
  }

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
    if (this.Search.length > 3) {
      this.ngAfterViewInit();
    } else if (this.Search.length == 0) {
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

    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: '2-digit'};
    return new Intl.DateTimeFormat('default', options).format(dateObj).replace(/\s/g, ' ');
  }


  agregar(row: any) {
    /* Necesito agregar el id de la noticia, el titulo, la url, la imagen, el sitio de la noticia, el resumen, la fecha de publicacion y la fecha de actualizacion  en un listado para enviarlo al backend
    [{
      "id": 21396,
      "title": "LeoLabs data shows on-orbit maneuvers by Russian satellites",
      "url": "https://spacenews.com/leolabs-data-shows-on-orbit-maneuvers-by-russian-satellites/",
      "image_url": "https://spacenews.com/wp-content/uploads/2023/11/Resurs-P3-Cosmos-2562-ProxOps-300x137.jpg",
      "news_site": "SpaceNews",
      "summary": "The space tracking firm LeoLabs over the past year tracked two Russian satellites performing rendezvous and proximity operations.",
      "published_at": "2023-11-06T23:44:42Z",
      "updated_at": "2023-11-06T23:54:11.113000Z",
      "featured": false,
      "launches": [],
      "events": []
    },
    {
      "id": 21395,
      "title": "Astra secures interim financing deal",
      "url": "https://spacenews.com/astra-secures-interim-financing-deal/",
      "image_url": "https://spacenews.com/wp-content/uploads/2021/12/SNA_SPAC_Astra-nasdaq-bell-300x200.jpeg",
      "news_site": "SpaceNews",
      "summary": "WASHINGTON — Launch vehicle and spacecraft propulsion company Astra Space said Nov. 6 that it has secured interim financing from two investors that gives the company through the end of […]",
      "published_at": "2023-11-06T23:33:14Z",
      "updated_at": "2023-11-06T23:34:11.402000Z",
      "featured": false,
      "launches": [],
      "events": []
    }]
     */


    const newItem = {
      id: row.id,
      title: row.title,
      url: row.url,
      image_url: row.image_url,
      news_site: row.news_site,
      summary: row.summary,
      published_at: row.published_at,
      updated_at: row.updated_at,
      featured: row.featured,
      launches: row.launches,
      events: row.events,
    };
    this.favoriteData.push(newItem);
    console.log(this.favoriteData);

    this.favorite = new FavoritasService(this._httpClient);
    this.favorite.postFavorite(this.favoriteData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}


