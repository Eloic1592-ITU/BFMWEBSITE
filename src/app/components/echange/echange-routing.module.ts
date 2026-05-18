import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EchangeComponent} from "./echange.component";
import {ThemesComponent} from './themes/themes.component'
import {ReponsesComponent} from "./reponses/reponses.component";
import {NouveauSujetComponent} from "./nouveau-sujet/nouveau-sujet.component";

const routes: Routes = [
    {
        path: "",
        component: EchangeComponent
    },
    {
        path: "posez-votre-question",
        component: NouveauSujetComponent
    },
    {
        path: "posez-votre-question/:cat",
        component: NouveauSujetComponent
    },
    {
        path: ":cat",
        component: ThemesComponent
    },
    {
        path: ":cat/:sujet",
        component: ReponsesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EchangeRoutingModule {
}
