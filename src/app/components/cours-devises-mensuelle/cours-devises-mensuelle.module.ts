import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursDevisesMensuelleRoutingModule} from './cours-devises-mensuelle-routing.module';
import {CoursDevisesMensuelleComponent} from "./cours-devises-mensuelle.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        CoursDevisesMensuelleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [CoursDevisesMensuelleComponent]
})
export class CoursDevisesMensuelleModule {
}
