import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaqRoutingModule} from './faq-routing.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {FaqComponent} from './faq.component'

@NgModule({
    imports: [
        CommonModule,
        AccordionModule,
        FaqRoutingModule
    ],
    declarations: [FaqComponent]
})
export class FaqModule {
}
