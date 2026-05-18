import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BulletinComponent implements OnInit {

    title: any;
    titlePage: any;
    contentData: any;
    submenuData: any;
    filArianeData: any;
    titleBlocDoc: any;
    descBlocDoc: any;
    tags: any;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private meta: Meta) {


        this.route.params.subscribe(params => {
            if (params['slug']) {
                this._data.getWpData('/bfm/page?url=' + params['slug']);
            }
        });
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_STANDARD) {
                this.contentData = art.data.data.content.element;
                this.submenuData = art.data.data.submenu;
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = art.data.data.submenu.fil_ariane;
                this._head.setPageTitle(this.titlePage);
                this.titleBlocDoc = art.data.data.content.titre_bloc_document;
                this.descBlocDoc = art.data.data.content.description_bloc_document;

                // add Tag
                this.tags = (art.data.data.content && art.data.data.content.tags) ? art.data.data.content.tags : '';
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.content && art.data.data.content.description_tags != '') {
                    this.meta.addTag({name: 'description', content: art.data.data.content.description_tags});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
        });

    }

}
