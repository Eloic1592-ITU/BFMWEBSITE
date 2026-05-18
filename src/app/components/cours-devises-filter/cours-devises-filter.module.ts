import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ChartsModule} from "ng2-charts";

import {CoursDevisesFilterRoutingModule} from './cours-devises-filter-routing.module';
import {CoursDevisesFilterComponent} from "./cours-devises-filter.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabeauCoursDevisesModule} from "./tabeau-cours-devises/tabeau-cours-devises.module";
import {LoaderService} from "../../services/loader.service";
import {TabeauCoursDevisesComponent} from "./tabeau-cours-devises/tabeau-cours-devises.component";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../common/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        CoursDevisesFilterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TabeauCoursDevisesModule,
        NgxMyDatePickerModule.forRoot(),
        NgbTabsetModule,
        ChartsModule,
        SharedModule
    ],
    declarations: [CoursDevisesFilterComponent],
    providers: [LoaderService],
    entryComponents: [TabeauCoursDevisesComponent],
    exports :[
        CoursDevisesFilterComponent
    ]
})
export class CoursDevisesFilterModule {
}
