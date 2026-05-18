import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResultatDuMarcheRoutingModule} from './resultat-du-marche-routing.module';
import {ResultatDuMarcheComponent} from "./resultat-du-marche.component";



@NgModule({
    imports: [
        CommonModule,
        ResultatDuMarcheRoutingModule,
    ],
    declarations: [ResultatDuMarcheComponent],
    exports: [
        ResultatDuMarcheComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "fr-FR"}, //replace "en-US" with your locale
        //otherProviders...
    ],
})
export class ResultatDuMarcheModule {
}
