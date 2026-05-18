import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME, NOMBRE_AFFICHAGE_OFFRE} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-liste-offres',
    templateUrl: './liste-offres.component.html',
    styleUrls: ['./liste-offres.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListeOffresComponent implements OnInit {

    itemsCount: number = 1;
    contentData: any;
    itemsPerPage: number = NOMBRE_AFFICHAGE_OFFRE;
    currentPage: number;
    titlePage: any;
    nextText: string = "Suivant";
    previousText: string = "Précédent";
    lastText: string = "Dernier";
    firstText: string = "Premier";
    maxSize: number = 8;
    mobileNextText: string = "";
    mobilePreviousText: string = "";
    mobileLastText: string = "";
    mobileFirstText: string = "";
    mobileMaxSize: number = 4;
    tags: string;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private meta: Meta,
                private myElement: ElementRef) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.goTopage(params['id']);
            }
        })
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_LISTING_OFFRES) {
                this.contentData = art.data.data.posts;
                this.itemsCount = art.data.data.count;
                if (!this.itemsCount && this.route.snapshot.params["id"] != 1) {
                    this.router.navigate(['/offre/page/1']);
                }
                this.itemsPerPage = NOMBRE_AFFICHAGE_OFFRE;
                this.titlePage = art.message + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                // add Tag
                this.tags = ( art.data.meta.tags ) ? art.data.meta.tags : '';
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.meta.description != '') {
                    this.meta.addTag({name: 'description', content: art.data.meta.description});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
            this.currentPage = this.route.snapshot.params["id"] ? parseInt(this.route.snapshot.params["id"]) : 1;
            this.gotoTop();
        });
    }

    goTopage(_pageId: string) {
        this._data.getWpData('/bfm/offre?page=' + _pageId);

    }


    pageChanged(event: any): void {
        this.router.navigate(['/offre/page', event.page]);
    }

    gotoTop() {
        let el = this.myElement.nativeElement.querySelector('#element');
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({behavior: "smooth"});
            }, 1000);

        }

    }

    getDateLast(dateVal) {
        if(dateVal != "") {
            const dateParts = dateVal.split('/');

            const day = parseInt(dateParts[0], 10) - 1;
            const month = parseInt(dateParts[1], 10); // Les mois dans JavaScript sont de 0 à 11
            const year = parseInt(dateParts[2], 10);

            const date = new Date(year+'-'+month+'-'+day);
            return  `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

        }
    }

}

