import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../common/shared/shared.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import {SITE_KEY, SITE_KEY_SECRET} from "../../services/data.service";

import {PageRoutingModule} from './page-routing.module';
import {PageComponent} from './page.component';
import {GalleryModule} from "../gallery/gallery.module";
import { ShareModule } from '@ngx-share/core';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AccordionModule,
        PageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        GalleryModule,
        NgxCaptchaModule.forRoot({
            reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
            invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
        }),
        ShareModule,
    ],
    declarations: [PageComponent]
})
export class PageModule {
}
