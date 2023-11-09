import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatLineModule} from "@angular/material/core";
import { NgxUiLoaderModule , NgxUiLoaderHttpModule } from "ngx-ui-loader";
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewFavoritasComponent } from './pages/noticiasFavoritas/view-favoritas/view-favoritas.component';
import { ViewNuevasComponent } from './pages/noticiasNuevas/view-nuevas/view-nuevas.component';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ViewFavoritasComponent,
    ViewNuevasComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatTableExporterModule,
        MatLineModule,
        NgxUiLoaderModule,
        MatPaginatorModule,
        MatSortModule,
        NgxUiLoaderHttpModule.forRoot({
            showForeground: true
        }),
        MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
