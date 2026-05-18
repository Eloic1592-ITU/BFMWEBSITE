import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentFilterRoutingModule} from './document-filter-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {DocumentFilterComponent} from "./document-filter.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { SharedModule } from "../../common/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        DocumentFilterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        SharedModule
    ],
    declarations: [DocumentFilterComponent]
})
export class DocumentFilterModule {
}
