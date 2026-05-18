import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommuniquesComponent} from "./communiques.component";
import {DetailCommuniqueComponent} from "./detail-communique/detail-communique.component";

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
    {
        path: "page/:id",
        component: CommuniquesComponent
    },
    {   path: "categorie/:categorie/page/:id",
        component: CommuniquesComponent
    },
    {
        path: ':id',
        component: DetailCommuniqueComponent

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommuniquesRoutingModule { }
