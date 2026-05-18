import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from "./search.component";

@NgModule({
    imports: [
        CommonModule,
        PaginationModule,
        SearchRoutingModule,
        FormsModule,
        CollapseModule.forRoot()
    ],
    declarations: [SearchComponent]
})
export class SearchModule {
}
