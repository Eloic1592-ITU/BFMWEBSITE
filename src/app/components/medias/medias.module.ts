import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxGalleryModule} from 'ngx-gallery';

import {MediasRoutingModule} from './medias-routing.module';
import {MediasComponent} from "./medias.component";
import {DetailAlbumComponent} from "./detail-album/detail-album.component";
import {SharedModule} from "../../common/shared/shared.module";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
    imports: [
        CommonModule,
        MediasRoutingModule,
        NgxGalleryModule,
        SharedModule,
        LazyLoadImageModule
    ],
    declarations: [MediasComponent, DetailAlbumComponent],
})
export class MediasModule {
}
