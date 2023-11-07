import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ViewNuevasComponent} from "./pages/noticiasNuevas/view-nuevas/view-nuevas.component";
import {ViewFavoritasComponent} from "./pages/noticiasFavoritas/view-favoritas/view-favoritas.component";
import {DetailsNuevasComponent} from "./pages/noticiasNuevas/details-nuevas/details-nuevas.component";
import {DetailsFavoritasComponent} from "./pages/noticiasFavoritas/details-favoritas/details-favoritas.component";

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: ViewNuevasComponent,
    children: [
      {path: 'details/:id', component: DetailsNuevasComponent}
    ]},

  {path: 'favorite', component: ViewFavoritasComponent,
    children: [
      {path: 'details/:id', component: DetailsFavoritasComponent}
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
