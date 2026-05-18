import {Component, OnInit} from '@angular/core';
import {HeadService} from "../../services/head.service";
import {ActivatedRoute, Router} from "@angular/router";
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {Meta} from "@angular/platform-browser";

@Component({
    selector: 'app-echange',
    templateUrl: './echange.component.html',
    styleUrls: ['./echange.component.scss'],
})
export class EchangeComponent implements OnInit {
    title : string;
    categories: object;
    tags : string;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private meta: Meta) {
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.ESPACE_ECHANGE ) {
                this.title = art.data.data.title;
                this.categories = art.data.data.categories;
                this._head.setPageTitle(this.title + ' | ' + SITE_NAME);
                // add Tag
                this.tags = ( art.data.data.tags ) ? art.data.data.tags : '';
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.description != '') {
                    this.meta.addTag({name: 'description', content: art.data.data.description});
                }

                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
        });

        //this._data.getWpData('./assets/data/espace-echange-accueil.json', true);
        this._data.getWpData('/bfm/forum_list_thematique');

    }

    createNewSujet(){
        this.router.navigateByUrl('/espace-echange/posez-votre-question');
    }
}
