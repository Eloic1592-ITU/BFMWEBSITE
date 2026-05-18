import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {INgxMyDpOptions} from "ngx-mydatepicker";
import {isUndefined} from "util";
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-cours-devises-avant-mid',
    templateUrl: './cours-devises-avant-mid.component.html',
    styleUrls: ['./cours-devises-avant-mid.component.scss']
})
export class CoursDevisesAvantMidComponent implements OnInit {
    submenuData: Array<any> = [];
    title: string;
    titlePage: string;
    filArianeData: Array<any> = [];
    filterDateForm: FormGroup;
    dateLimit : string;
    optionDate : INgxMyDpOptions;
    dataVolume : Array<string>;
    dataReference : Array<string>;
    dataReferenceHead : Array<string>;
    dataHeadVolume : Array<string> = ["Volume Eur", "Nombre"];
    model: any;
    dateNow : string;
    result : boolean = false;
    tags:any;
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
                this.dateLimit = ( art.data.data.dateLimit ) ? art.data.data.dateLimit : "";
                this.dateNow = ( art.data.data.content.element.date ) ? art.data.data.content.element.date : "";
                const str = this.dateLimit.split('/');
                this.optionDate = {
                    dateFormat: 'dd/mm/yyyy',
                    minYear : 2001,
                    maxYear : Number(str[2]),
                    showTodayBtn : false,
                    dayLabels : {su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam"},
                    monthLabels: {1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc"},
                };
                this.model = {date: { year: 2001, month: 1, day: 2 }};
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
            dateFilter: ["", Validators.required],
        });
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

    onSubmitFiltre(_dataForm: any) :void {
        if (_dataForm) {
            var formData = new FormData();
            for ( let key in _dataForm ){
                if ( key === "dateFilter" ) {
                    let date = _dataForm[key]['date'];
                    formData.append("dateFilter", date.year + '/' + date.month + '/' + date.day );
                }
            }
            this._data.postWpData('/bfm/cours_devise_journaliere_avant_mid', formData);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.MID_EN_ARIARY_JOURNALIERS_AVANT_MID) {
                    this.dataReferenceHead = ( art.data.data.thead ) ? art.data.data.thead : [];
                    this.dataReference = ( art.data.data.reference ) ? this.transform(art.data.data.reference) : [];
                    this.dataVolume = ( art.data.data.volume  ) ? this.transform(art.data.data.volume) : [];
                    this.dateNow = this.datePipe.transform(new Date(this.model.date.year, this.model.date.month - 1, this.model.date.day), "dd/LL/y");
                    this.result = ( this.dataReference.length > 0 || this.dataVolume ) ? false : true;
                }
            });
        }
    }

}
