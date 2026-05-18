import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursDevisesRoutingModule} from './cours-devises-routing.module';
import {CoursDevisesComponent} from "./cours-devises.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";

@NgModule({
    imports: [
        CommonModule,
        CoursDevisesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule.forRoot(),
    ],
    declarations: [CoursDevisesComponent]
})
export class CoursDevisesModule {
}
