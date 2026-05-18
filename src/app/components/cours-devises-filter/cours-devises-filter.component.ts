import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HeadService} from "../../services/head.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {INgxMyDpOptions} from "ngx-mydatepicker";
import {isUndefined} from "ngx-bootstrap/chronos/utils/type-checks";
import {isNull, isObject} from "util";
import {NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-cours-devises-filter',
    templateUrl: './cours-devises-filter.component.html',
    styleUrls: ['./cours-devises-filter.component.scss'],
    providers: [NgbTabsetConfig],
    encapsulation: ViewEncapsulation.None,
})
export class CoursDevisesFilterComponent implements OnInit {
    filterDateFilterForm: FormGroup;
    optionDateDebut: INgxMyDpOptions;
    optionDateFin: INgxMyDpOptions;
    modelDebut: object;
    modelFin: object;
    dataFilter: Array<object>;
    dataSelected: string = "";
    dataCoursMid : Array<any>;
    dataCoursMidMax : Array<any>;
    dataCoursMidMin : Array<any>;
    grapheCoursMid : Array<any>;
    coeffChartData: Array<any> = [{"data": []}];
    coeffChartLabels : Array<any>;
    filterElement : string = "";
    loader : boolean = false;
    showElementDesc : boolean = false;
    chartColors:any = [{
        borderColor: "#287eb2",
        backgroundColor: 'rgba(255,255,255,0.1)',
        pointBackgroundColor: "#287eb2"
    }];
    chartType:string = 'line';
    dateDernierDevise : Date;
    @Input('elementRechercheTaux') elementRechercheTaux: object;
    constructor(private _data: DataService,
                private router: Router,
                private fb: FormBuilder,
                private datePipe: DatePipe,
                private config: NgbTabsetConfig) {

                    this.createForm();
    }

    ngOnInit() {
        this._data.getWpDataNoLoading("/bfm/list_element_cours_devises");
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LIST_FILTER_DEVISE) {
                this.dataFilter = ( art.data.data && art.data.data ) ? art.data.data : [];
                this.optionDateDebut = {
                    dateFormat: 'dd/mm/yyyy',
                    minYear: 2016,
                    showTodayBtn: true,
                    dayLabels : {su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam"},
                    monthLabels: {1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc"},
                };
                this.optionDateFin = {
                    dateFormat: 'dd/mm/yyyy',
                    minYear: 2016,
                    showTodayBtn: true,
                    dayLabels : {su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam"},
                    monthLabels: {1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc"},
                };
                this.modelDebut = {date: {year: 2018, month: 1, day: 1}};
                let day = (new Date()).getDate();
                let month = (new Date()).getMonth();
                let year = (new Date()).getFullYear();
                this.modelFin = {date: {year: year, month: month + 1, day: day}};
            }
        });
        this.getDernierDateDevise();
    }

    createForm() {
        var thisYear = (new Date()).getFullYear();
        var start = new Date("1/1/" + thisYear);
        this.filterDateFilterForm = this.fb.group({
                dateFilterDebut: ["", Validators.required],
                dateFilterFin: ["", Validators.required],
                filterData: ["", Validators.required],
            });
    }
    account_validation_messages = {
        'filterData' :[
            {type : 'required', message : 'La devise est requis.'},
        ],
    };

    onSubmitFiltreDate(_dataForm) {
        if (_dataForm) {
            this.showElementDesc = false;
            var formData = new FormData();
            var data = this.dataFilter;
            for (let key in _dataForm) {
                if ( key == "filterData" ){
                    formData.append( key, _dataForm[key] );
                    if ( data.length > 0 ){
                        for( let item of data ){
                            if ( item['code'] == _dataForm[key] ) this.filterElement = item['label'];
                        }
                    }
                } else {
                    let date = _dataForm[key]['date'];
                    formData.append(key, date.year + '/' + date.month + '/' + date.day);
                }

            }
            this._data.postWpData('/bfm/cours_mid_en_ar_filter', formData);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.MID_EN_ARIARY_ENTRE_DEUX_DATE) {
                    this.config.justify = 'justified';
                    this.config.type = 'pills';
                    this.dataCoursMid = ( art.data.data.coursMid ) ? this.transformObjetToArray(art.data.data.coursMid) : [];
                    this.dataCoursMidMax = ( art.data.data.coursMidMax ) ? art.data.data.coursMidMax : {};
                    this.dataCoursMidMin = ( art.data.data.coursMidMin ) ? art.data.data.coursMidMin : {};
                    this.grapheCoursMid = ( art.data.data.grapheData ) ? this.transformObjetToArray(art.data.data.grapheData) : [];
                    if ( this.grapheCoursMid.length > 0 ){
                        var data = [];
                        var element = [];
                        var elt = art.data.data.grapheData;
                        for ( let item in elt ){
                           data.push( elt[item] );
                           element.push(  this.datePipe.transform(item, 'dd/MM/yyyy') );
                        }
                        this.coeffChartData[0]= {
                            "label" : this.filterElement,
                            "data": ( data.length > 0 ) ? data : [],
                        };
                        this.coeffChartLabels = ( element.length > 0 ) ? element : [];
                        this.showElementDesc = true;
                    }

                }
                this.loader = false;

            });

        }
    }
    private returnOptions = ( _yAxisOption:any = {
        ticks: {
            beginAtZero:true,
        }
    }) => {
        let globalOptions = {
            responsive: true,
            legend: {
                display: true
            },
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                },
                point: {
                    pointStyle: 'rectRot',
                    radius: 7
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                }],
                yAxes: [_yAxisOption]
            },
            layout: {
                padding: {
                    right: 20,
                }
            }
        };

        return globalOptions;
    };
    chartOptions = this.returnOptions({
        ticks: {
            beginAtZero:false,
            //stepSize: 0.1
        }
    });


    transformObjetToArray(_value) : any {
        let keys = [];
        if (!isUndefined(_value)) {
            for (let key in _value) {
                keys.push({key: key, value: _value[key]});
            }
        }
        return keys;
    }

    // Taux Directeur
    getDernierDateDevise() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DATE_MAX_DEVISE) {
                if(art.data.data) {
                    this.dateDernierDevise = art.data.data.DATE_MAX_DEVISE;
                }
                
            }
        });

        this._data.getWpData('/bfm/dernier_date_cours_devises');
        //this._data.getWpData('./assets/data/taux-directeur.json', true);
    }

}
