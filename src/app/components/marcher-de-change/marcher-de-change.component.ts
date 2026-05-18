///<reference path="../../../../node_modules/@angular/core/src/change_detection/pipe_transform.d.ts"/>
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {NgbTabset, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import localeFr from '@angular/common/locales/fr';
import {DatePipe, registerLocaleData} from "@angular/common";
import {Meta} from "@angular/platform-browser";

@Component({
    selector: 'app-marcher-de-change',
    templateUrl: './marcher-de-change.component.html',
    styleUrls: ['./marcher-de-change.component.scss'],
    providers: [NgbTabsetConfig],
    encapsulation: ViewEncapsulation.None,
})
export class MarcherDeChangeComponent implements OnInit {
    submenuData: Array<any>;
    title: string;
    titlePage: string;
    filArianeData: Array<object>;
    contentDesc: string;
    operationOps: Array<any>;

    heureCron: any[];
    dateNow: string;
    contentDevise: Object = {};
    dateNowMarcher: string;
    //hoursKey: Array<string> = ["11H00", "12H00", "13H30", "14H30", "14H45"];
    hoursKey: Array<string> = ["14H45", "14H30", "13H30", "12H00", "11H00"];
    referenceEur: Object = {};
    referenceUsd: Object = {};
    fileAttached : Array<string>;
    descriptionFile : string;
    elementRechercheTaux : any;
    private tabSet: NgbTabset;
    tags : string;

    @ViewChild(NgbTabset) set content(contentElt: NgbTabset) {
        this.tabSet = contentElt;
    };
    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private datePipe: DatePipe,
                private meta: Meta) {
        registerLocaleData(localeFr);
        this.route.params.subscribe(params => {
            if (params['slug']) {
                this._data.getWpData('/bfm/page?url=' + params['slug']);
                this.getLatestOps();
                this.getResultatsMarcher();
                this.loadLastestOpsAndListResultMarche();
            }
        });

    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code == codeWS.PAGE_STANDARD) {
                this.submenuData = (art.data.data && art.data.data.submenu) ? art.data.data.submenu : [];
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = (art.data.data && art.data.data.submenu && art.data.data.submenu.fil_ariane) ? art.data.data.submenu.fil_ariane : [];
                this._head.setPageTitle(this.titlePage);
                this.contentDesc = (art.data.data.content && art.data.data.content.description) ? art.data.data.content.description : "";
                this.fileAttached = ( art.data.data.content && art.data.data.content.file ) ? art.data.data.content.file : [];
                this.descriptionFile = ( art.data.data.content && art.data.data.content.descriptionFile ) ? art.data.data.content.descriptionFile :"";
                this.elementRechercheTaux = { 'fileAttached' : this.fileAttached, 'descriptionFile' : this.descriptionFile };
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
            }
        });
    }

    getLatestOps() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LATEST_OPS) {
                this.operationOps = (art.data.data.content.operations) ? art.data.data.content.operations : [];
                this.heureCron = (art.data.data.heure) ? art.data.data.heure : [];
                this.dateNow = ( art.data.data.date ) ? art.data.data.date : "";
            }
        });

        this._data.getWpData('/bfm/operation_boucle');
        //this._data.getWpData('./assets/data/derniere-operation.json', true);
    }
    getResultatsMarcher() {
        this._data.getWpDataNoLoading('/bfm/list_resultat_marcher');
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LIST_RESULTATS_MARCHER) {
                this.contentDevise = ( art.data.data.content && art.data.data.content ) ? art.data.data.content : {};
                this.dateNowMarcher = ( art.data.data && art.data.data.date ) ? art.data.data.date : "";
                this.referenceEur = ( art.data.data.reference && art.data.data.reference && art.data.data.reference.tableFirstEur ) ? art.data.data.reference.tableFirstEur : {};
                this.referenceUsd = ( art.data.data.reference && art.data.data.reference && art.data.data.reference.tableFirstUsd ) ? art.data.data.reference.tableFirstUsd : {};
            }
        });
    }

    loadLastestOpsAndListResultMarche() {
        setInterval(() => {
            this.setLatestOps();
            this.getResultatsMarcher();
        }, 120000);
    }
    setLatestOps() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LATEST_OPS) {
                this.operationOps = (art.data.data.content.operations) ? art.data.data.content.operations : "";
                this.heureCron = (art.data.data.heure) ? art.data.data.heure : [];
                this.dateNow = ( art.data.data.date ) ? art.data.data.date : "";
            }
        });

        this._data.getWpDataNoLoading('/bfm/operation_boucle');
    }

    ngAfterViewInit() {
        let idTabset = window.location.hash.substr(1);
        this.tabSet.select(idTabset);
    }

    changeHash= function(data) {
        console.log(data);
        location.hash = data.nextId;
    };


}


