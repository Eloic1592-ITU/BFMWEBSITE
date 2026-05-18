import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME, YEARS_DEBUT_MENSUELLE_EN_ARIARY} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {isUndefined} from "util";
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-cours-devises-mensuelle',
    templateUrl: './cours-devises-mensuelle.component.html',
    styleUrls: ['./cours-devises-mensuelle.component.scss']
})
export class CoursDevisesMensuelleComponent implements OnInit {
    submenuData: Array<any> = [];
    title: string;
    titlePage: string;
    filArianeData: Array<any> = [];
    filterDateForm: FormGroup;
    yearSelected: string;
    years: Array<any> = [];
    headDevise : Array<any>;
    dataDevise : Array<any>;
    dataMoyenne : Array<any>;
    tags: any;

    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private fb: FormBuilder,
                private datePipe: DatePipe,
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
                this.submenuData = ( art.data.data.submenu  ) ? art.data.data.submenu : [];
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = ( art.data.data.submenu && art.data.data.submenu.fil_ariane ) ? art.data.data.submenu.fil_ariane : [];
                this._head.setPageTitle(this.titlePage);
                this.getOptionSelectYear();
                // add Tag
                this.tags = art.data.data.content.tags;
                if(this.tags != false){
                    let tag = [];
                    for (let key of this.tags){
                        tag.push(key.name);
                    }
                    this.meta.updateTag({name: 'keywords', content: tag.join(', ')});
                }
                if(art.data.data.content.description_tags.length > 1){
                    this.meta.updateTag({name: 'description', content: art.data.data.content.description_tags});
                }
            }
        });
    }

    private createForm() {
        var start = new Date("1/1/2001");
        this.filterDateForm = this.fb.group({
            yearFilter: ["", Validators.required],
        });
    }

    onSubmitFiltre(_dataForm: any): void {
        if (_dataForm) {
            this._data.postWpData('/bfm/cours_devise_mensuelle_en_ariary', _dataForm);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.MID_EN_ARIARY_MENSUELLE_EN_ARIARY) {
                    this.headDevise = ( art.data.data.head ) ? art.data.data.head : [];
                    this.dataDevise = ( art.data.data.list ) ? this.transformObjetToArray(this.transform(art.data.data.list)) : [];
                    this.dataMoyenne = ( art.data.data.moyenne ) ? this.transform(art.data.data.moyenne) : [];
                    this.yearSelected = ( art.data.data.yearSelected ) ? art.data.data.yearSelected : "";
                }
            });
        }
    }

    getOptionSelectYear() {
        var ladate = new Date();
        var yearNow = ladate.getFullYear();
        for (var i = yearNow; i >= YEARS_DEBUT_MENSUELLE_EN_ARIARY; --i) {
            this.years.push(i);
        }
    }
    transform(_value) : any {
        let keys = [];
        if (!isUndefined(_value)) {
            Object.keys(_value).forEach(function (k) {
                keys.push(_value[k])
            })
            return keys[0];
        }
        return [];
    }
    transformObjetToArray(_value) : any {
        let keys = [];
        if (!isUndefined(_value)) {
            for (let key in _value) {
                keys.push({key: key, value: _value[key]});
            }
        }
        return keys;
    }

}
