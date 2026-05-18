import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgPipesModule } from "ngx-pipes";

import {SharedModule} from '../../common/shared/shared.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';

import {TextesReglementairesRoutingModule} from './textes-reglementaires-routing.module';
import {TextesReglementairesComponent} from "./textes-reglementaires.component";
import {DetailTexteReglementaireComponent} from "./detail-texte-reglementaire/detail-texte-reglementaire.component";
import {GalleryModule} from "../gallery/gallery.module";
import { ShareModule } from '@ngx-share/core';

@NgModule({
    imports: [
        CommonModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgPipesModule,
        AccordionModule,
        // NgxGalleryModule,
        GalleryModule,
        TextesReglementairesRoutingModule,
        ShareModule,
    ],
    declarations: [TextesReglementairesComponent, DetailTexteReglementaireComponent]
})
export class TextesReglementairesModule {
}
