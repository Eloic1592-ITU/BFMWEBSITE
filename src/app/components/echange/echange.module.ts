import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import {SITE_KEY, SITE_KEY_SECRET} from "../../services/data.service";

import {EchangeRoutingModule} from './echange-routing.module';
import {EchangeComponent} from './echange.component';
import {ThemesComponent} from './themes/themes.component';
import {ReponsesComponent} from './reponses/reponses.component';
import { NouveauSujetComponent } from './nouveau-sujet/nouveau-sujet.component';
@NgModule({
    imports: [
        CommonModule,
        EchangeRoutingModule,
        PaginationModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
       NgxCaptchaModule.forRoot({
            reCaptcha2SiteKey: SITE_KEY,
          invisibleCaptchaSiteKey: SITE_KEY_SECRET
        }),
    ],
    declarations: [EchangeComponent, ThemesComponent, ReponsesComponent, NouveauSujetComponent]
})
export class EchangeModule {
}
