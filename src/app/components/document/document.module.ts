import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import {NgPipesModule} from 'ngx-pipes';
import {DocumentComponent} from './document.component'
import {SITE_KEY, SITE_KEY_SECRET} from "../../services/data.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    NgxCaptchaModule.forRoot({
          reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
          invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
    })
  ],
  declarations: [DocumentComponent],
  exports : [
      DocumentComponent
  ]
})
export class DocumentModule { }
