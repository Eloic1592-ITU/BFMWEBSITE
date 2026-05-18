import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MediasComponent} from "./medias.component";
import {DetailAlbumComponent} from "./detail-album/detail-album.component";

const routes: Routes = [
    {
        path: ':id/:titleModel',
        component: MediasComponent
    },
    {
        path: ':id',
        component: DetailAlbumComponent
    },
    { path: "", redirectTo: "/404" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MediasRoutingModule {
}
