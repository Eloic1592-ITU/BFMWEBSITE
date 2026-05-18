import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursDevisesAvantMidRoutingModule} from './cours-devises-avant-mid-routing.module';
import {CoursDevisesAvantMidComponent} from "./cours-devises-avant-mid.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxMyDatePickerModule } from "ngx-mydatepicker";

@NgModule({
    imports: [
        CommonModule,
        CoursDevisesAvantMidRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule.forRoot(),
    ],
    declarations: [CoursDevisesAvantMidComponent]
})
export class CoursDevisesAvantMidModule {
}
