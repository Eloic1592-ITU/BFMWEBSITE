import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, NOMBRE_LISTE_ANNEE_TAUX_INTERET, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-evolution-taux-directeur',
    templateUrl: './evolution-taux-directeur.component.html',
    styleUrls: ['./evolution-taux-directeur.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EvolutionTauxDirecteurComponent implements OnInit {
    title: any;
    titlePage: any;
    contentData: any;
    submenuData: any;
    filArianeData: any;
    filterYearForm: FormGroup;
    yearSelected: any;
    years: Array<any> = [];
    tabEvolution: Array<any>;
    tabToShow: Array<any>;
    dataNotElement : any;
    tabHead: Array<any>;
    loader : boolean = false;
    tags: string;

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
            if (art.code === codeWS.PAGE_STANDARD) {
                this.contentData = art.data.data.content.element;
                this.submenuData = art.data.data.submenu;
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = art.data.data.submenu.fil_ariane;
                this._head.setPageTitle(this.titlePage);
                this.getOptionSelectYear();
                // add Tag
                this.tags = (art.data.data.content && art.data.data.content.tags) ? art.data.data.content.tags : '';
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.content && art.data.data.content.description_tags != '') {
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

    getOptionSelectYear() {
        //var ladate = new Date();
        var ladate = new Date();
        //var yearNow = ladate.getFullYear();
        var yearNow = 2019;
        var startOpt = (yearNow - NOMBRE_LISTE_ANNEE_TAUX_INTERET) + 1;
        for (var i = startOpt; i <= yearNow; i++) {
            this.years.push(i);
        }
    }

    onSubmitFilter(_dataForm: any): void {
        if (_dataForm) {
            this.loader = true;
            this._data.postWpData('/bfm/evolution_taux_directeur', _dataForm);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.EVOLUTION_TAUX_DIRECTEUR) {

                    this.tabEvolution = art.data.data;
                    this.yearSelected = _dataForm.yearFilter;
                    this.tabToShow = this.getTabToShow(_dataForm.yearFilter);
                    this.dataNotElement = art.data.data.noData;
                }
                this.loader = false;
            });

        }
    }

    getTabToShow(_iYear) {
        if (this.tabEvolution[_iYear]) {
            return this.tabEvolution[_iYear];
        }
        return [];
    }

}
