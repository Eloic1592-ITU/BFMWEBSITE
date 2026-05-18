import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListeActualitesComponent} from "./liste-actualites.component";
import {DetailActualiteComponent} from "./detail-actualite/detail-actualite.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: 'page/1',
        pathMatch: 'full'
    },
    {
        path: "page",
        redirectTo: 'actualite/page/1',
        pathMatch: 'full'
    },
    {
        path: "page/:id",
        component: ListeActualitesComponent
    },
    {   path: "categorie/:categorie/page/:id",
        component: ListeActualitesComponent
    },
    {
      path: ':id',
      component: DetailActualiteComponent

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListeActualitesRoutingModule {
}
