import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../services/head.service';
import {codeWS, DataService, NOMBRE_AFFICHAGE_ACTUALITE, SITE_NAME} from '../../services/data.service';
import {Meta} from "@angular/platform-browser";

@Component({
    selector: 'app-textes-reglementaires',
    templateUrl: './textes-reglementaires.component.html',
    styleUrls: ['./textes-reglementaires.component.scss', '../liste-actualites/liste-actualites.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextesReglementairesComponent implements OnInit {
    itemsCount: number = 1;
    contentData: any;
    itemsPerPage: number = NOMBRE_AFFICHAGE_ACTUALITE;
    currentPage: number;
    reinitCurrentPageTheme: any = 1;
    reinitCurrentPagetexte: any = 1;
    titlePage: any;
    listetheme: any;
    typetexte: any;
    currentIdTheme: any = 0;
    currentIdTypeTexte: any = 0;
    nextText: string = "Suivant";
    previousText: string = "Précédent";
    lastText: string = "Dernier";
    firstText: string = "Premier";
    maxSize: number = 8;
    tags: string;
    mobileNextText: string = "";
    mobilePreviousText: string = "";
    mobileLastText: string = "";
    mobileFirstText: string = "";
    mobileMaxSize: number = 4;
    theme: string = "";
    filArianeData: any;
    type: string = "";


    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private myElement: ElementRef,
                private router: Router,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['theme']) {
                this.theme = params['theme']
            }
            if (params['type']) {
                this.type = params['type']
            }
            if (params['id']) {
                this.currentPage = params['id'];
                this.goTopage(this.currentPage)
            }
        })
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.TEXTES_REGLEMENTAIRES) {
                this.contentData = art.data.data.posts;
                // console.log(art.data.data.posts);
                this.itemsCount = art.data.data.count;
                /** a changer*/
                this.itemsPerPage = 6;
                this.listetheme = art.data.data.listeTheme;
                this.typetexte = art.data.data.listeTypeTexte;
                this.filArianeData = art.data.data.submenu.fil_ariane;
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

    //filter_paginate(){}


    /**event filtre par theme*/
    filter_by_theme(filterVal: any, _pageId) {

        this.currentIdTheme = filterVal;
        if (this.currentIdTheme === '0' && this.type === "") {
            this.router.navigate(['/texte-reglementaire/page/'+this.reinitCurrentPageTheme]);
        }
        else if (this.currentIdTheme === '0' && this.type !== "") {
            this.router.navigate(['/texte-reglementaire/type/'+ this.type + '/page/' + this.reinitCurrentPageTheme]);
        }
        else if (this.currentIdTheme !== '0' && this.type === "") {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.currentIdTheme + '/page/' + this.reinitCurrentPageTheme]);
        }
        else {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.currentIdTheme + '/type/' + this.type+'/page/' + this.reinitCurrentPageTheme]);
        }
    }

    /**  event filtre par type de texte*/
    filter_by_type_texte(filterVal: any, _pageId) {
        this.currentIdTypeTexte = filterVal;
        if (this.currentIdTypeTexte === '0' && this.theme == "") {
            this.router.navigate(['/texte-reglementaire/page/'+this.reinitCurrentPageTheme]);
        }
        else if (this.currentIdTypeTexte === '0' && this.theme !== "") {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.theme + '/page/' + this.reinitCurrentPageTheme]);
        }
        else if (this.currentIdTypeTexte !== '0' && this.theme === "") {
            this.router.navigate(['/texte-reglementaire/type/'+ this.currentIdTypeTexte + '/page/' + this.reinitCurrentPageTheme]);
        }
        else {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.theme + '/type/' + this.currentIdTypeTexte+'/page/' + this.reinitCurrentPageTheme]);
        }
    }

    goTopage(_pageId) {

        if (this.type === "" && this.theme == "") {
            this._data.getWpData('/bfm/texte-reglementaires?page=' + _pageId);
        }
        else if (this.type === "" && this.theme !== "") {
            this._data.getWpData('/bfm/texte-reglementaires?page=' + _pageId + '&idtheme=' + this.theme);
        }
        else if (this.type !== "" && this.theme === "") {
            this._data.getWpData('/bfm/texte-reglementaires?page=' + _pageId + '&idTypeTexte=' + this.type);
        }
        else {
            this._data.getWpData('/bfm/texte-reglementaires?page=' + _pageId + '&idtheme=' + this.theme + '&idTypeTexte=' + this.type);
        }
    }

    pageChanged(event: any): void {
        if (this.theme != "" && this.type == "") {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.theme + '/page/' + event.page]);
        } else if(this.theme != "" && this.type != "") {
            this.router.navigate(['/texte-reglementaire/theme/'+ this.theme +'/type/' + this.type + '/page/' + event.page]);
        } else if(this.theme == "" && this.type != "") {
            this.router.navigate(['/texte-reglementaire/type/' + this.type + '/page/' + event.page]);
        } else {
            this.router.navigate(['/texte-reglementaire/page', event.page]);
        }


    }

    details(id: any) {
        this.router.navigate(['/texte-reglementaires/detail', id]);

    }

    gotoTop() {
        let el = this.myElement.nativeElement.querySelector('#element');
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({behavior: "smooth"});
            }, 1000);

        }

    }

}
