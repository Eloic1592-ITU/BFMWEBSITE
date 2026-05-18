import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InflationFonctionRoutingModule} from './inflation-fonction-routing.module';
import {InflationFonctionComponent} from "./inflation-fonction.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../common/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        InflationFonctionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [InflationFonctionComponent]
})
export class InflationFonctionModule {
}
