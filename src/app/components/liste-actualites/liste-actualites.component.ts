import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {
    codeWS,
    DataService,
    SITE_NAME,
    NOMBRE_AFFICHAGE_ACTUALITE,
    NOMBRE_AFFICHAGE_OFFRE
} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../services/head.service';
import {FormGroup, FormControl} from '@angular/forms';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-liste-actualites',
    templateUrl: './liste-actualites.component.html',
    styleUrls: ['./liste-actualites.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListeActualitesComponent implements OnInit {
    itemsCount: number = 1;
    contentData: any;
    category: any;
    itemsPerPage: number = NOMBRE_AFFICHAGE_ACTUALITE;
    currentPage: number;
    titlePage: any;
    nextText: string = "Suivant";
    previousText: string = "Précédent";
    lastText: string = "Dernier";
    firstText: string = "Premier";
    maxSize: number = 8;
    reinitpagination: any = 1;
    mobileNextText: string = "";
    mobilePreviousText: string = "";
    mobileLastText: string = "";
    mobileFirstText: string = "";
    mobileMaxSize: number = 4;
    currentIdCategory: string = "";
    tags: any;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private myElement : ElementRef,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['categorie']) {
                this.currentIdCategory = params['categorie']
            }
            if (params['id']) {
                this.goTopage(params['id']);
            }
        });
    }


    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_LISTING_ACTUALITE) {
                this.contentData = art.data.data.posts;
                this.category = art.data.data.listeTaxonomie;
                this.itemsCount = art.data.data.count;
                this.itemsPerPage = NOMBRE_AFFICHAGE_ACTUALITE;
                this.titlePage = art.message + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                // add Tag
                this.tags = ( art.data.meta.tags ) ? art.data.meta.tags : '';
                if(this.tags != ''){
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if(art.data.meta.description !=''){
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

    filter_by_cat(filterVal: any, currentPage: number) {
        if (filterVal == 0) {
            this.router.navigate(['/actualite/page/'+ this.reinitpagination]);
        }
        else {
            this.router.navigate(['/actualite/categorie/'+ filterVal + '/page/' + this.reinitpagination]);
        }
    }


    goTopage(_pageId: string) {
        if (this.currentIdCategory == "") this._data.getWpData('/bfm/actualite?page=' + _pageId);
        else this._data.getWpData('/bfm/actualite?page=' + _pageId + '&idcategorie=' + this.currentIdCategory);
    }

    pageChanged(event: any): void {
        if (this.currentIdCategory != ""){
            this.router.navigate(['/actualite/page/'+ event.page+'/categorie/'+this.currentIdCategory]);
        } else{
            this.router.navigate(['/actualite/page', event.page]);
        }
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
