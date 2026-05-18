import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../../services/head.service';
import {NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import '../../../../../node_modules/font-awesome/css/font-awesome.css';
import {Meta} from "@angular/platform-browser";

@Component({
    selector: 'app-detail-album',
    templateUrl: './detail-album.component.html',
    styleUrls: ['./detail-album.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailAlbumComponent implements OnInit {
    title: any;
    date;
    any;
    contentData: any[];
    titlePage: any;
    titleTop: any;
    titlePrema: any;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    tags: any;
    viewPartage : boolean;
    url : string;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.loadDetails(params['id']);
            }
        });
    }

    ngOnInit() {
        var tab = [];
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_DETAIL_ALBUM) {
                this.contentData = art.data.data.content.element;
                this.title = art.data.data.content.title;
                this.date = art.data.data.content.date;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                this.titleTop = art.data.data.content.titleTop;
                this.titlePrema = art.data.data.content.titlePrema;
                this.viewPartage = ( art.data.data.content && art.data.data.content.view_partage ) ? art.data.data.content.view_partage : false;

                this.contentData.forEach(function (element) {
                    tab.push({
                        small: element.attachement_thumb,
                        medium: element.attachement_normale,
                        big: element.attachement_full,
                        description: element.title
                    });
                });
                this.tags = ( art.data.data.content.element.tags ) ? art.data.data.content.element.tags : '';
                //console.log(this.tags);
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.content.element.description != '') {
                    this.meta.addTag({name: 'description', content: art.data.data.content.element.description});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
                // update meta tag
                this._head.updateMetaTags(
                    this.title,
                    art.data.data.content.element.description,
                    document.location.href,
                    null
                );
                this.url = document.location.href;
                if(art.data.data.content.a_la_une != '' && art.data.data.content.a_la_une != false){
                    this.meta.updateTag({property: 'og:image', content: art.data.data.content.a_la_une});
                }
            }
        });
        this.galleryImages = tab;

        this.galleryOptions = [
            {"imageAnimation": "slide"},
            {"imageDescription": true, "width": "100%", "height": "600px"},
            {"breakpoint": 800, "width": "100%", "height": "600px", "thumbnailsColumns": 4},
            {"breakpoint": 500, "width": "100%", "height": "600px", "thumbnailsColumns": 2}
        ];


    }

    loadDetails(id: string) {
        this._data.getWpData('/bfm/detail-album?idalbum=' + id);
    }

}
