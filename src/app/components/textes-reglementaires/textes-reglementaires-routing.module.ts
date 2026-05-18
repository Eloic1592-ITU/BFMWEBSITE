import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextesReglementairesComponent} from "./textes-reglementaires.component";
import {DetailTexteReglementaireComponent} from "./detail-texte-reglementaire/detail-texte-reglementaire.component";

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
    {   path: "theme/:theme/page/:id",
        component: TextesReglementairesComponent
    },
    {   path: "type/:type/page/:id",
        component: TextesReglementairesComponent
    },
    {   path: "theme/:theme/type/:type/page/:id",
        component: TextesReglementairesComponent
    },
    {   path: "page/:id",
        component: TextesReglementairesComponent
    },
    {
        path : ':id',
        component : DetailTexteReglementaireComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TextesReglementairesRoutingModule {
}
