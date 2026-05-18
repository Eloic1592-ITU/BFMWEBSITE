import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from "./home.component";
import {HomeDesktopComponent} from './home-desktop/home-desktop.component';
import {HomeMobileComponent} from './home-mobile/home-mobile.component';
import {SharedModule} from '../../common/shared/shared.module';

import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgPipesModule} from 'ngx-pipes';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    slidesPerView: 1
};

@NgModule({
  imports: [
    CommonModule,
        HomeRoutingModule,
        SwiperModule,
        NgPipesModule,
        NgbModule.forRoot(),
        SharedModule
        // NgbModule
  ],
    declarations: [HomeComponent, HomeDesktopComponent, HomeMobileComponent],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})
export class HomeModule {
}
