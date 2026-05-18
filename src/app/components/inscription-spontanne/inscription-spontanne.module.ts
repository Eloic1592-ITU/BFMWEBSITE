import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCaptchaModule } from "ngx-captcha";
import { SITE_KEY, SITE_KEY_SECRET } from "../../services/data.service";

import { InscriptionSpontanneRoutingModule } from './inscription-spontanne-routing.module';
import {InscriptionSpontanneComponent} from "./inscription-spontanne.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InscriptionSpontanneRoutingModule,
    NgxCaptchaModule.forRoot({
        reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
        invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
    }),
  ],
  declarations: [InscriptionSpontanneComponent]
})
export class InscriptionSpontanneModule { }
