import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InflationOrigineProduitRoutingModule} from './inflation-origine-produit-routing.module';
import {InflationOrigineProduitComponent} from "./inflation-origine-produit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../common/shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        InflationOrigineProduitRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [InflationOrigineProduitComponent]
})
export class InflationOrigineProduitModule {
}
