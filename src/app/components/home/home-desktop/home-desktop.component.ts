import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService, codeWS, SITE_NAME} from "../../../services/data.service";
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from "@angular/router";
import {Meta} from '@angular/platform-browser';
import {HeadService} from "../../../services/head.service";

@Component({
    selector: 'app-home-desktop',
    templateUrl: './home-desktop.component.html',
    styleUrls: ['./home-desktop.component.scss'],
    providers: [NgbTabsetConfig],
    encapsulation: ViewEncapsulation.None
})
export class HomeDesktopComponent implements OnInit {

    /* Properties */
    title = 'Banky Foiben\'ny Madagasikara';
    bloc3onglet: any;
    blocAlaUne: any;
    blocNouvelleGamme : any;
    blocNewGammeBillet : any;
    blocEquipe : any;
    blocEchange : any;
    urlImageBlocEchange : any;
    urlBlocEchange : string;
    tags : any;

    /* Swiper Config */
    public config: SwiperConfigInterface = {
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false
        },
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    };
    titlePage: string;

    constructor(private _data: DataService, config: NgbTabsetConfig, private router: Router, private meta: Meta, private _head: HeadService,) {
        config.justify = 'justified';
        config.type = 'pills';
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.ACCUEIL ) {
                this.blocAlaUne = art.data.data.a_la_une;
                this.bloc3onglet = art.data.data.bloc_third_element;
            }

            //nouvelle gamme et texte
            if ( art.code === codeWS.ACCUEIL ){
                this.blocNouvelleGamme = art.data.data.bloc_nouvelle_gamme;
                this.blocNewGammeBillet = this.blocNouvelleGamme.bloc_new_gamme_billet;
                this.blocEquipe = this.blocNouvelleGamme.bloc_equipe;
                this.blocEchange = this.blocNouvelleGamme.bloc_echange;
                this.urlBlocEchange = (this.blocNouvelleGamme.urlEspaceEchange) ?  this.blocNouvelleGamme.urlEspaceEchange : "";
                this.urlImageBlocEchange = this.blocNouvelleGamme.urlImageBlocEchange
                this.titlePage = this.title + ' | ' + SITE_NAME ;
                this._head.setPageTitle(this.titlePage);

                // add Tag
                this.tags = art.data.data.meta.tags;
                if(this.tags != false){
                    let tag = [];
                    for (let key of this.tags){
                        tag.push(key.name);
                    }
                    this.meta.addTag({name: 'keywords', content: tag.join(', ')});
                }
                if(art.data.data.meta.description.length > 0){
                    this.meta.addTag({name: 'description', content: art.data.data.meta.description});
                }
            }
        });

        this._data.getWpData('/bfm/accueil');
    }


}
