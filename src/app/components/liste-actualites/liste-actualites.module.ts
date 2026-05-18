import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { NgxGalleryModule } from 'ngx-gallery';

import {SharedModule} from '../../common/shared/shared.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';

import {ListeActualitesRoutingModule} from './liste-actualites-routing.module';
import {ListeActualitesComponent} from "./liste-actualites.component";
import {DetailActualiteComponent} from "./detail-actualite/detail-actualite.component";
import {GalleryModule} from "../gallery/gallery.module";
import { ShareModule } from '@ngx-share/core';

@NgModule({
    imports: [
        CommonModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AccordionModule,
        //NgxGalleryModule,
        GalleryModule,
        ListeActualitesRoutingModule,
        ShareModule,
    ],
    declarations: [ListeActualitesComponent, DetailActualiteComponent]
})
export class ListeActualitesModule {
}
