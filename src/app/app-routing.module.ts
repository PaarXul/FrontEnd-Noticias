import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ViewNuevasComponent} from "./pages/noticiasNuevas/view-nuevas/view-nuevas.component";
import {ViewFavoritasComponent} from "./pages/noticiasFavoritas/view-favoritas/view-favoritas.component";


const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: ViewNuevasComponent},

  {path: 'favorite', component: ViewFavoritasComponent,
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
