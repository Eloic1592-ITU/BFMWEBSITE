import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InflationSecteurProductionRoutingModule} from './inflation-secteur-production-routing.module';
import {InflationSecteurProductionComponent} from "./inflation-secteur-production.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../common/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        InflationSecteurProductionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [InflationSecteurProductionComponent]
})
export class InflationSecteurProductionModule {
}
