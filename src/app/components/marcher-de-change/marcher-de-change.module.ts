import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarcherDeChangeRoutingModule} from './marcher-de-change-routing.module';
import {NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {ChartsModule} from "ng2-charts";
import {MarcherDeChangeComponent} from "./marcher-de-change.component";
import {SharedModule} from "../../common/shared/shared.module";
import {CoursDevisesFilterModule} from "../cours-devises-filter/cours-devises-filter.module";
import {ResultatDuMarcheModule} from "../resultat-du-marche/resultat-du-marche.module";
import {ObjetToArrayPipe} from "../../services/objetToArray.pipe";

@NgModule({
    imports: [
        CommonModule,
        MarcherDeChangeRoutingModule,
        NgbTabsetModule,
        ChartsModule,
        SharedModule,
        CoursDevisesFilterModule,
        ResultatDuMarcheModule,
    ],
    declarations: [
        MarcherDeChangeComponent,
        ObjetToArrayPipe
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "fr-FR"}, //replace "en-US" with your locale
        //otherProviders...
    ],
    exports: [
        ObjetToArrayPipe
    ]
})
export class MarcherDeChangeModule {
}
