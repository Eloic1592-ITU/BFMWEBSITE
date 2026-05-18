import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../common/shared/shared.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import {SITE_KEY, SITE_KEY_SECRET} from "../../services/data.service";

import { BulletinRoutingModule } from './bulletin-routing.module';
import { BulletinComponent} from './bulletin.component';
import {DocumentModule} from "../document/document.module";

@NgModule({
  imports: [
      CommonModule,
      SharedModule,
      AccordionModule,
      BulletinRoutingModule,
      FormsModule,
      DocumentModule,
      ReactiveFormsModule,
      NgxCaptchaModule.forRoot({
          reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
          invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
      }),
  ],
  declarations: [BulletinComponent]
})
export class BulletinModule { }
