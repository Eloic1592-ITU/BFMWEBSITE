///<reference path="../../../../node_modules/@angular/common/src/pipes/date_pipe.d.ts"/>
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {isUndefined} from "ngx-bootstrap/chronos/utils/type-checks";
import { INgxMyDpOptions } from "ngx-mydatepicker";
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-cours-devises',
    templateUrl: './cours-devises.component.html',
    styleUrls: ['./cours-devises.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoursDevisesComponent implements OnInit {
    submenuData: Array<any> = [];
    title: string;
    titlePage: string;
    filArianeData: Array<any> = [];
    filterDateForm: FormGroup;
    tableFirstEur: Array<any> = [];
    tableFirstUsd: Array<any> = [];
    tableSecond: Array<any> = [];
    tableSecondHead: Array<any> = [];
    tableThird: Array<any> = [];
    dateNow: any;
    optionDate : INgxMyDpOptions;
    model: any;
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
                this.submenuData = ( art.data.data.submenu  ) ?  art.data.data.submenu : [];
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = ( art.data.data.submenu && art.data.data.submenu.fil_ariane ) ? art.data.data.submenu.fil_ariane : [];
                this._head.setPageTitle(this.titlePage);
                this.dateNow = ( art.data.data.content.element.date ) ? art.data.data.content.element.date : "";
                this.tableFirstEur = ( art.data.data.content.element && art.data.data.content.element.tableFirstEur ) ? this.tranformTable(this.transform(art.data.data.content.element.tableFirstEur[0])) : [];
                this.tableFirstUsd = ( art.data.data.content.element && art.data.data.content.element.tableFirstUsd ) ? this.tranformTable(this.transform(art.data.data.content.element.tableFirstUsd[0])) : [];
                this.tableSecond = ( art.data.data.content.element && art.data.data.content.element.tableSecond ) ? this.transform(art.data.data.content.element.tableSecond[0]) : [];
                this.tableSecondHead = ( art.data.data.content.element && art.data.data.content.element.tableSecondThead ) ? this.transformObjetToArray(art.data.data.content.element.tableSecondThead) : [];
                this.tableThird = ( art.data.data.content.element && art.data.data.content.element.tableThird ) ? this.transform(art.data.data.content.element.tableThird[0]) : [];
                const str = this.dateNow.split('/');
                const year = Number(str[2]);
                const month = Number(str[1]) - 1;
                const date = Number(str[0]);
                this.model = {date: { year: year, month: month+1, day: date }};
                this.optionDate = {
                    dateFormat: 'dd/mm/yyyy',
                    minYear : 2005,
                    showTodayBtn : true,
                    dayLabels : {su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam"},
                    monthLabels: {1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc"},
                };
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
        this.filterDateForm = this.fb.group({
            dateFilter: ["", Validators.required],
        });
    }

    parse(_value: any): any {
        if ((typeof _value === 'string') && (_value.indexOf('/') > -1)) {
            const str = _value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            return this.datePipe.transform(new Date(year, month, date), "yyyy-MM-dd");
        }
    }
    transform(_value) : any {
        let keys = [];
        if (!isUndefined(_value)) {
            Object.keys(_value).forEach(function (k) {
                keys.push(_value[k])
            });
            return keys[0];
        }
        return [];
    }
    tranformTable(_value ) :any {
        let thead = [];
        let value = [];
        if ( !isUndefined(_value) ) {
            Object.keys(_value).forEach(function (k) {
                thead.push(k);
                value.push(_value[k]);
            })
        }
        return {thead : thead, value : value};
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

    onSubmitFiltre(_dataForm: any) :void {
        if (_dataForm) {
            var formData = new FormData();
            for ( let key in _dataForm ){
                if ( key === "dateFilter" ) {
                    let date = _dataForm[key]['date'];
                    formData.append("dateFilter", date.year + '/' + date.month + '/' + date.day );
                }
            }
            this._data.postWpData('/bfm/cours_mid_en_ar', formData);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.MID_EN_ARIARY_JOURNALIERS) {
                    this.tableFirstEur = ( art.data.data && art.data.data.tableFirstEur ) ? this.tranformTable(this.transform(art.data.data.tableFirstEur)) : [];
                    this.tableFirstUsd = ( art.data.data && art.data.data.tableFirstUsd ) ? this.tranformTable(this.transform(art.data.data.tableFirstUsd)) : [];
                    this.tableSecond = ( art.data.data && art.data.data.tableSecond ) ? this.transform(art.data.data.tableSecond) : [];
                    this.tableSecondHead = ( art.data.data && art.data.data.tableSecondThead ) ? this.transformObjetToArray(art.data.data.tableSecondThead) : [];
                    this.tableThird = ( art.data.data && art.data.data.tableThird ) ? this.transform(art.data.data.tableThird) : [];
                    this.dateNow = ( this.model.date ) ?  this.model.date.day + '/' + this.model.date.month + '/' + this.model.date.year : "";
                }
            });

        }
    }
}
