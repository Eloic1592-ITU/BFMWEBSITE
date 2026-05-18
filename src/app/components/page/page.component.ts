import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {isNull} from "util";
import {Meta} from "@angular/platform-browser";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit {
    title : any;
    titlePage : any;
    contentData : any;
    submenuData : any;
    filArianeData : any;
    modelePage : string;
    titlePrema : any;
    url: any;
    tags: string;
    viewPartage : boolean;
    constructor(
        private _data: DataService,
        private route: ActivatedRoute,
        private _head: HeadService,
        private router: Router,
        private meta : Meta
    ) {
        this.route.params.subscribe( params => {
            if (params['pageID']) {
                this.goTopage(params['pageID']);
            }
        })
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.PAGE_STANDARD ) {
                this.contentData = ( art.data.data.content ) ? art.data.data.content.element : [];
                this.submenuData = art.data.data.submenu;
                this.title = art.data.data.content.title;
                if ( this.title == '' ){
                    this.router.navigate(['404'], {skipLocationChange: true});
                }
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME ;
                this.filArianeData = art.data.data.submenu.fil_ariane;
                this._head.setPageTitle(this.titlePage);
                this.modelePage = ( art.data.data.content.modelePage ) ? art.data.data.content.modelePage : '';
                this.viewPartage = ( art.data.data.content && art.data.data.content.view_partage ) ? art.data.data.content.view_partage : false;
                // add Tag
                this.tags = (art.data.data.content && art.data.data.content.tags) ? art.data.data.content.tags : '' ;
                if( this.tags != '' ){
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if(art.data.data.content && art.data.data.content.description_tags != ''){
                    this.meta.addTag({name: 'description', content: art.data.data.content.description_tags});
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
                    this.tags,
                    document.location.href,
                    null
                );
                this.url = document.location.href;
                if (art.data.data.content.a_la_une != '' && art.data.data.content.a_la_une != false) {
                    this.meta.updateTag({property: 'og:image', content: art.data.data.content.a_la_une});
                }

                console.log (this.filArianeData);
            }
        });
    }

    goTopage(_pageSlug: string) {
        if (_pageSlug != '') {
            let _match = _pageSlug.split('_')[0];
            switch (_match) {
                case "contact":
                    // console.log (this);
                    this.router.navigateByUrl('/contact', {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "vente":
                    this.router.navigateByUrl('/bulletin/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                // case "offre":
                //     this.router.navigateByUrl('/offre/page/1', { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "actualite":
                //     this.router.navigateByUrl('/actualite/page/1', { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "communique":
                //     this.router.navigateByUrl('/communique/page/1', { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "texte":
                //     this.router.navigateByUrl('/texte-reglementaire/page/1', { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                case "galerie":
                    this.router.navigateByUrl('/galerie/model/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                // case "devise":
                //     this.router.navigateByUrl('/devise/' + _pageSlug , { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "devises":
                //     this.router.navigateByUrl('/devises/' + _pageSlug , { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "devisemid":
                //     this.router.navigateByUrl('/devisemid/' + _pageSlug , { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                // case "devisemens":
                //     this.router.navigateByUrl('/devisemens/' + _pageSlug , { skipLocationChange: true });
                //     _pageSlug = null;
                //     break;
                case "pdf":
                    this.router.navigateByUrl('/pdf/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "origine":

                    this.router.navigateByUrl('/inflation-origine-produit/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "secteur":

                    this.router.navigateByUrl('/inflation-secteur-production/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "fonction":

                    this.router.navigateByUrl('/inflation-fonction/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "taux":

                    this.router.navigateByUrl('/evolution-taux-directeur/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;
                    break;
                case "marche":
                    this.router.navigateByUrl('/indicateur/' + _pageSlug, {skipLocationChange: true});
                    _pageSlug = null;

                    break
                default:
                    this._data.getWpData('/bfm/page?url=' + _pageSlug);
                    _pageSlug = null;
                    break;
            }
        } else {
            this.router.navigate(['404'], {skipLocationChange: true});
        }

    }

}
