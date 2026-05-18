import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, NOMBRE_LISTE_ANNEE, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-inflation-secteur-production',
    templateUrl: './inflation-secteur-production.component.html',
    styleUrls: ['./inflation-secteur-production.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InflationSecteurProductionComponent implements OnInit {
    title : any;
    titlePage : any;
    contentData : any;
    submenuData : any;
    filArianeData : any;
    filterYearForm: FormGroup;
    yearSelected: any;
    years: Array<any> = [];
    tabInflation1: Array<any>;
    tabToShow1: Array<any>;
    tabHead1: Array<any>;
    tabInflation2: Array<any>;
    tabToShow2: Array<any>;
    tabHead2: Array<any>;
    loader: boolean = false;
    tags: string;
    descriptionPage : string;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private fb: FormBuilder,
                private meta: Meta) {

        this.route.params.subscribe(params => {
            if (params['slug']) {
                this._data.getWpData('/bfm/page?url=' + params['slug']);
            }
            this.createForm();

        });
    }

    ngOnInit() {

        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.PAGE_STANDARD ) {
                this.contentData = art.data.data.content.element;
                this.submenuData = art.data.data.submenu;
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME ;
                this.descriptionPage = ( art.data.data.content.description ) ? art.data.data.content.description : "";
                this.filArianeData = art.data.data.submenu.fil_ariane;
                this._head.setPageTitle(this.titlePage);
                this.getOptionSelectYear();
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
            }
        });

    }

    private createForm() {
        this.filterYearForm = this.fb.group({
            yearFilter: ["", Validators.required],
        });
    }

    getOptionSelectYear(){
        var ladate=new Date();
        var yearNow = ladate.getFullYear();
        var startOpt  = (yearNow - NOMBRE_LISTE_ANNEE) + 1 ;
        for( var i=startOpt; i <= yearNow; i++ ){
            this.years.push(i);
        }
    }

    onSubmitFilter(_dataForm: any) :void {
        if (_dataForm) {
            this.loader = true;
            this._data.postWpData('/bfm/inflation_par_secteur_production', _dataForm);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.INFLATION_SECTEUR_PRODUCTION) {

                    this.tabInflation1 =  art.data.data.tabInflation1;
                    this.tabInflation2 =  art.data.data.tabInflation2;
                    this.yearSelected = _dataForm.yearFilter;
                    this.tabToShow1 = this.getTabToShow(_dataForm.yearFilter, 1);
                    this.tabHead1 = art.data.data.tabHead1;
                    this.tabToShow2 = this.getTabToShow(_dataForm.yearFilter, 2);
                    this.tabHead2 = art.data.data.tabHead2;
                }
                this.loader = false;
            });

        }
    }

    getTabToShow(_iYear, $_iNumTab){
        if($_iNumTab == 1){
            if(this.tabInflation1[_iYear]){
                return this.tabInflation1[_iYear];
            }
        }

        if($_iNumTab == 2){
            if(this.tabInflation2[_iYear]){
                return this.tabInflation2[_iYear];
            }
        }

        return [];
    }

}
