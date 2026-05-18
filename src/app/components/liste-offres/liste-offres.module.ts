import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from "../../common/shared/shared.module";
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgPipesModule } from "ngx-pipes";

import {ListeOffresRoutingModule} from './liste-offres-routing.module';
import {ListeOffresComponent} from './liste-offres.component';
import { DetailOffreComponent} from "./detail-offre/detail-offre.component";
import {SITE_KEY, SITE_KEY_SECRET} from "../../services/data.service";
import { ShareModule } from '@ngx-share/core';

@NgModule({
    imports: [
        CommonModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ListeOffresRoutingModule,
        SharedModule,
        NgxCaptchaModule.forRoot({
            reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
            invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
        }),
        NgPipesModule,
        ShareModule,
    ],
    declarations: [ListeOffresComponent, DetailOffreComponent]
})
export class ListeOffresModule {
}
