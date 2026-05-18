import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListeOffresComponent} from './liste-offres.component'
import {DetailOffreComponent} from "./detail-offre/detail-offre.component";

const routes: Routes = [
    {
        path:"",
        redirectTo : 'page/1',
        pathMatch: 'full'
    },
    {
        path:"page",
        redirectTo : 'page/1',
        pathMatch: 'full'
    },
    {   path: "page/:id",
        component: ListeOffresComponent
    },
    {
        path : ':id',
        component : DetailOffreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListeOffresRoutingModule {
}
