import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../../services/head.service';
import {codeWS, DataService, SITE_NAME} from '../../../services/data.service';
import {Meta} from '@angular/platform-browser';


@Component({
    selector: 'app-detail-communique',
    templateUrl: './detail-communique.component.html',
    styleUrls: ['./detail-communique.component.scss', '../../page/page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailCommuniqueComponent implements OnInit {
    title: any;
    contentData: any;
    titlePage: any;
    tags: string;
    url: any;
    viewPartage : boolean;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                console.log(params['id']);
                this.loadDetails(params['id']);
            }
        });
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_DETAIL_COMMUNIQUE) {
                this.contentData = art.data.data.content.element;
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                this.viewPartage = ( art.data.data.content && art.data.data.content.view_partage ) ? art.data.data.content.view_partage : false;
                // add Tag
                this.tags = (art.data.data.content.tags) ? art.data.data.content.tags : '';
                //console.log(this.tags);
                if (this.tags != '') {

                    this.meta.updateTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.content.description != '') {
                    this.meta.updateTag({name: 'description', content: art.data.data.content.description});
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
                    art.data.data.content.description,
                    document.location.href,
                    null
                );
                this.url = document.location.href;
                if(art.data.data.content.a_la_une != '' && art.data.data.content.a_la_une != false){
                    this.meta.updateTag({property: 'og:image', content: art.data.data.content.a_la_une});
                }
            }
        });
    }

    loadDetails(id: string) {
        this._data.getWpData('/bfm/detail-communique?idcommunique=' + id);
    }

}
