import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { SharedModule } from "../../common/shared/shared.module";
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {GalleryModule} from "../gallery/gallery.module";
import {FormsModule} from '@angular/forms';
import { NgPipesModule } from "ngx-pipes";

import {CommuniquesRoutingModule} from './communiques-routing.module';
import {CommuniquesComponent} from "./communiques.component";
import {DetailCommuniqueComponent} from "./detail-communique/detail-communique.component";
import { ShareModule } from '@ngx-share/core';

@NgModule({
    imports: [
        CommonModule,
        PaginationModule,
        SharedModule,
        FormsModule,
        NgPipesModule,
        AccordionModule,
        GalleryModule,
        CommuniquesRoutingModule,
        ShareModule.forRoot(),
    ],
    declarations: [CommuniquesComponent, DetailCommuniqueComponent]
})
export class CommuniquesModule {
}
