import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

import {Observable, Subject} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AppNotification, DataResponse} from "../classes/data-response";
import {toBase64String} from "@angular/compiler/src/output/source_map";
import {Network} from '@ngx-pwa/offline';

import * as Loki from 'lokijs';
import * as LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';


// const WS_URL = environment.webServiceURL;
export const SITE_NAME = "Banky Foiben'i Madagasikara";
export const NOMBRE_AFFICHAGE_OFFRE = 6;
export const NOMBRE_AFFICHAGE_ACTUALITE = 6;
export const NOMBRE_AFFICHAGE_TEXTE_REGLEMENTAIRES = 6;
export const NOMBRE_AFFICHAGE_COMMUNIQUES = 7;
export const NOMBRE_AFFICHAGE_RESULTAT_RECHERCHE = 6;
export const NOMBRE_AFFICHAGE_MEDIA = 6;
export const NOMBRE_AFFICHAGE_SUJET = 10;
export const NOMBRE_AFFICHAGE_REPONSE = 10;
export const SITE_KEY = (environment.mobile) ? "6Ld4SnIUAAAAAKUz7khUEUiKuyECZV3hk32QN10t" : "6LfyancUAAAAAIPBuSnys34E5e6d8gyPwmHW58HX";
export const SITE_KEY_SECRET = (environment.mobile) ? "6Ld4SnIUAAAAAJPIqSa8kZ_gofIohOwYMYz-ZWcV" : "6LfyancUAAAAAKtZ_cMkY_jUkvBSeyRECDpg78BY";
export const YEARS_DEBUT_MENSUELLE_EN_ARIARY = 2005;
export const NOMBRE_LISTE_ANNEE = 3;
export const TAB_KEY_INFLATION = ["inflation", "inflationproduit", "inflationproduction", "inflationfonction"];
export const NOMBRE_LISTE_ANNEE_TAUX_INTERET = 25;

export const codeWS = {
    HEADER: "main-header",
    MENU_FOOTER: "menu-footer",
    MAIN_MENU: "menu-primary",
    MENU_MOBILE: "menu-mobile",
    SUBMENU: "submenu",
    SIDEBAR: "sidebar",
    ACCUEIL: "accueil",
    DEVISES: "cours-devises",
    LATEST_OPS: "last-operation",
    TAUX_DIR: "taux-directeur",
    COEFF_RES: "coeff-reserve",
    RESERVE: "reserve-devises",
    DERNIER_OPERATIONS: "derniere-operation",
    PAGE_STANDARD: "page-standard",
    PAGE_LISTING_OFFRES: "page-listing-offres",
    PAGE_LISTING_ACTUALITE: "page-listing-actualite",
    PAGE_DETAIL_ACTUALITE: "page-detail-actualite",
    PAGE_DETAIL_ALBUM: "page-detail-album",
    PAGE_DETAIL_TEXTE_REGLEMENTAIRE: "page-detail-texte-reglementaire",
    PAGE_LISTING_COMMUNIQUES: "page-listing-communique",
    FOIRE_AUX_QUESTIONS: "foire-aux-questions",
    TEXTES_REGLEMENTAIRES: "page-listing-texte-reglementaires",
    FORMULAIRE_CONTACT: "contact-form",
    PAGE_LISTING_MEDIA: "page-listing-media",
    FORMULAIRE_CONTACT_LIST: "contact-form-element",
    DOCUMENT: "document",
    FORM_BULLETIN: "form-bulletin",
    DETAIL_OFFRE: "detail-offre",
    INSCRIPTION_OFFRE: "inscription-form",
    INSCRIPTION_SPONTANNE_OFFRE: "inscription-spontanne-form",
    INSCRIPTION_OFFRE_INFOS: "inscription-form-infos",
    PAGE_DETAIL_COMMUNIQUE: "page-detail-communique",
    INSCRIPTION_NEWSLETTER: "inscription-newsletter",
    PAGE_RESULTAT_RECHERCHE: "page-resultat-recherche",
    MID_EN_ARIARY_JOURNALIERS: "cours-de-mid-en-ar-journalier",
    MID_EN_ARIARY_ENTRE_DEUX_DATE: "cours-de-mid-en-ar-filter",
    MID_EN_ARIARY_JOURNALIERS_AVANT_MID: "cours-devise-journaliere-avant-mid",
    MID_EN_ARIARY_MENSUELLE_EN_ARIARY: "cours-devise-mensuelle-en-ariary",
    DOCUMENT_PDF_DONWLODER: "document-pdf-filter",
    MODELE_DE_PAGE: 'page-modele',
    INFLATION_ORIGINE_PRODUIT: "inflation-par-origine-de-produit",
    INFLATION_SECTEUR_PRODUCTION: "inflation-par-secteur-de-production",
    INFLATION_FONCTION: "inflation-par-fonction",
    EVOLUTION_TAUX_DIRECTEUR: "evolution-taux-directeur",
    ESPACE_ECHANGE: "espace-echange",
    ESPACE_ECHANGE_THEME: "espace-echange-theme",
    ESPACE_ECHANGE_SUJET: "espace-echange-sujet",
    FORMULAIRE_THEMATIQUE_LIST: "thematique-list-element",
    FORM_SUJET: "form-sujet",
    FORM_REPONSE: "form-reponse",
    LIST_FILTER_DEVISE: "devises-list-filter",
    RESULTATS_MARCHER: "resultats-marcher",
    LIST_RESULTATS_MARCHER: "list-resultats-marcher",
    ACCUEIL_MOBILE: "accueil-mobile",
    TAUX_REF_INTERBANQUE: "taux-ref-interbanque",
    DATE_MAX_DEVISE : "dernier-date-cours-devises"
};

@Injectable({
    providedIn: 'root'
})
export class DataService {

    dataResponse = new Subject<DataResponse>();
    appNotification = new Subject<AppNotification>();
    DBInitialize = new Subject<Boolean>();
    menuParent = new Subject<string>();
    reqNum: number = 0;
    htmlBody = document.getElementsByTagName('body')[0];
    isPageModele: boolean;
    online$ = this.network.onlineChanges;
    isMobile = environment.mobile;
    localDB: any;
    bfmCollection: any = null;
    dataTable: any = [];

    constructor(
        private _http: HttpClient,
        protected network: Network) {
        this.online$.subscribe(status => {
            let _message = status ? 'ONLINE' : 'OFFLINE';
            this.sendNotification('info', _message)
        });
    }

    getWpData(_urlParams, _isLocal: boolean = false) {
        let WS_URL = _isLocal ? '' : environment.webServiceURL;

        if (this.isMobile) {
            this.getWPDataMobile(_urlParams);
        } else {
            this.reqNum++;
            this.htmlBody.classList.add('loading');

            // let modeleRegEx = RegExp('modele_page','g');
            // console.log ('query =>', _urlParams, 'isPageModele=' , this.isPageModele);

            this._http.get<DataResponse>(WS_URL + _urlParams).subscribe(data => {
                this.dataResponse.next(data);
                // console.log ('datacode=', data);

                if (data.code === codeWS.PAGE_STANDARD) {
                    // console.log ('parent=', data.data.data.submenu.fil_ariane[0].title);
                    let pageParent = '';
                    if ( data.data.data.submenu.fil_ariane.length > 0 ) {
                        pageParent = data.data.data.submenu.fil_ariane[0].title;
                    }

                    this.menuParent.next(pageParent);

                }

                if (data.data.status == 200)
                    this.reqNum--;

                this.isPageModele = data.code == 'page-modele' ? true : false;
                this.sendNotification('success', 'URL = ' + _urlParams + ' / message = ' + data.message);
                // console.log ('res =>', _urlParams, 'isPageModele=' , this.isPageModele);
                if (this.reqNum == 0) {
                    if (data.code !== codeWS.MODELE_DE_PAGE || data.code !== codeWS.PAGE_STANDARD || data.code !== codeWS.LIST_FILTER_DEVISE) {
                        setTimeout(() => {
                            console.log('hide splash');
                            this.htmlBody.classList.remove('loading');
                        }, 500);
                    }

                }
            })
        }

    }

    postWpData(_urlParams, _params) {
        this._http.post<DataResponse>(environment.webServiceURL + _urlParams, _params).subscribe(data => {
            this.dataResponse.next(data);
        })
    }

    getWpDataNoLoading(_urlParams, _isLocal: boolean = false) {


        let WS_URL = _isLocal ? '' : environment.webServiceURL;

        this._http.get<DataResponse>(WS_URL + _urlParams).subscribe(data => {
            this.dataResponse.next(data);
        })
    }

    loadDB() {
        const promise = new Promise((resolve, reject) => {
            const adapter = new LokiIndexedAdapter();
            this.localDB = new Loki('bfm.db', {
                autosave: true,
                autosaveInterval: 4 * 1000,
                adapter: adapter,
            });

            // console.log ( typeof (this.localDB), this.localDB);

            this.localDB.loadDatabase({}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.bfmCollection = this.localDB.getCollection('bfm');

                    // console.log ('DBCollection = ', this.bfmCollection);

                    if (this.bfmCollection === null) {
                        this.bfmCollection = this.localDB.addCollection('bfm');
                    }
                    // this.bfmCollection = this.localDB.addCollection('bfm');
                    resolve('Base de données chargée');
                }
            });
        });
        return promise;
    }

    insertToDB(_item) {
        this.bfmCollection.insert(_item);
    }

    initAppMobile() {
        this.loadDB()
            .then((_message) => {
                this.DBInitialize.next(true);
                this.sendNotification('success', _message);

                let localData = this.bfmCollection.data;
                if (localData.length > 0) {
                    // this.sendNotification( 'info', 'Aucune donnée trouvée');
                } else {
                    // this.sendNotification( 'info', 'Aucune donnée trouvée');

                    if (this.network.online) {
                        // this.sendNotification( 'info', 'Récuperation des données en cours');
                        this.getDataFromMenu('/bfm/menu?menu_name=mobile');
                    } else {
                        this.sendNotification('error', 'Aucune connexion trouvée');
                    }
                }
            })
            .catch((err) => {
                this.sendNotification('error', 'Impossible de créer la base de donnée ( error: ' + err + ' )');
            });
    }

    getDataFromMenu(_url) {
        this._http.get<DataResponse>(environment.webServiceURL + _url).subscribe(data => {
            // console.log (data);
            this.dataTable[_url] = data;
            this.insertToDB({
                url: _url,
                item: data
            });

            // console.log (data.code);

            if (data.code === codeWS.MENU_MOBILE) {
                //console.log (data.data.data);
                if (data.data.data.length > 0) {
                    let menuItemList = data.data.data;

                    menuItemList.forEach(item => {
                        // console.log (item);
                        let checkURLRegEx = new RegExp(/^\//); // check if url begins with '/'
                        let extractURLRexEx = new RegExp(/\/([^/]+)\//); // extract rul slug
                        // console.log ( checkURLRegEx.test ( item.url ) );

                        if (checkURLRegEx.test(item.url)) {
                            let slug = extractURLRexEx.exec(item.url);
                            // console.log(slug[1]);

                            // /bfm/page?url=marcherchange-marche-de-change
                            // Comment this to disable offline version.
                            this.getDataFromMenu('/bfm/page?url=' + slug[1]);
                        }
                    })
                }
            }
        });
    }

    getWPDataMobile(_url) {
        let WS_URL = environment.webServiceURL;

        // let results = this.bfmCollection.find({url: _url});
        console.log('regnum+', this.reqNum);

        if (this.bfmCollection !== null) {
            console.log('DBCollection = ', this.bfmCollection);

            this.reqNum++;
            this.htmlBody.classList.add('loading');

            let results = this.bfmCollection.find({url: _url});

            // console.log ('URL = ', _url, ' Result = ', results);

            if (results.length > 0) {
                // console.log (results[0].item);

                this.dataResponse.next(results[0].item);
                this.reqNum--;
                // console.log ('regnum-', this.reqNum);
                if (this.reqNum == 0) {
                    setTimeout(() => {
                        // console.log ('hide splash');
                        this.htmlBody.classList.remove('loading');
                    }, 500);
                }
            } else {
                if (this.network.online) {
                    this._http.get<DataResponse>(WS_URL + _url).subscribe(data => {
                        // this.sendNotification('success', 'URL = ' + _url + ' / message = ' + data.message);
                        // console.log ('data = ', data);
                        this.dataResponse.next(data);

                        this.reqNum--;
                        if (this.reqNum == 0) {
                            setTimeout(() => {
                                console.log('hide splash');
                                this.htmlBody.classList.remove('loading');
                            }, 500);
                        }
                    });
                } else {
                    this.htmlBody.classList.remove('loading');
                    this.sendNotification('error', 'Pas de connexion internet');
                }
            }
        }
    }

    sendNotification(_type, _message) {
        /*this.appNotification.next({
            type: _type,
            message: _message
        })*/
    }
}
