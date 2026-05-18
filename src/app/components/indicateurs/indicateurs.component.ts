import {Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Input} from '@angular/core';
import {DataService, codeWS} from '../../services/data.service';
import {NgbPanelChangeEvent, NgbPanel, NgbAccordion} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from "@angular/common";
import {isObject, isUndefined} from "util";

@Component({
    selector: 'app-indicateurs',
    templateUrl: './indicateurs.component.html',
    styleUrls: ['./indicateurs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IndicateursComponent implements OnInit, AfterViewInit {

    // @ViewChild('accordion') accWrapper: NgbAccordion;
    currencies = [];
    latestOps = [];
    tauxDir: any;
    tauxOpeMonetaire: String = "-";
    dernierDateOpeMonetaire = '';
    // latest_update: string;
    lastUpdate: any;
    operationOps: any;
    dataEur : Array<object>;
    dataUsd : Array<object>;

    //GRaphiques
    tauxChartLabels: Array<any>;
    tauxChartData: Array<any> = [{"data": []}];

    coeffChartLabels: Array<any>;
    coeffChartData: Array<any> = [{"data": []}];

    reserveChartLabels: Array<any>;
    reserveChartData: Array<any> = [{"data": []}];
    deviseChartData: Array<any> = [{"data": []}];
    deviseChartLabels : Array<any>;

    dernierOperationMontant: any;
    dernierOperationMontantFirst: any;
    dernierOperationMontantSecond: any;
    dernierOperationTauxPonderer: any;
    dernierOperationDate: any;
    @Input('infosDescription') infosDescription: any;
    heureCron: Array<string> = ["16:00", "19:00"];
    dateNow : Date;
    chartColors: any = [{
        borderColor: "#287eb2",
        backgroundColor: 'rgba(255,255,255,0.1)',
        pointBackgroundColor: "#287eb2"
    }];

    chartType: string = 'line';

    constructor(private _data: DataService,
                private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.getCurrancyRate(); // Cours de devises
        // this.getLatestOps();
        this.getTauxDir();
        this.getCoeffReserve();
        this.getDevisesReserve();
        this.getDernierOperation();
        //this.loadLastestOps();
        this.loadCurrancyRate();
        this.getTauxRefOperation();

    }

    ngAfterViewInit() {
        //this.highlightActivePanel ( this.accWrapper.activeIds[0], true, this.accWrapper);
    }

    private returnOptions = (_yAxisOption: any = {
        ticks: {
            beginAtZero: true,
            //stepSize: 4
        }
    }) => {
        let globalOptions = {
            responsive: true,
            legend: {
                display: false
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

    private returnDeviseOptions = (_yAxisOption: any = {
        ticks: {
            beginAtZero: true,
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

    // Cours de devises
    private getCurrancyRate() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DEVISES) {
                // console.log (art.data.data);
                this.currencies = ( art.data.data.content ) ? art.data.data.content : [];
                this.dateNow =( art.data.data.date ) ? art.data.data.date : "";
                this.dataEur = ( art.data.data.datagraph && art.data.data.datagraph.dataEuro ) ? this.transformObjetToArray(art.data.data.datagraph.dataEuro) : [];
                this.dataUsd = ( art.data.data.datagraph && art.data.data.datagraph.dataUsd ) ? this.transformObjetToArray(art.data.data.datagraph.dataUsd) : [];
                if ( this.dataUsd.length > 0 ){
                    var dataUsd = [];
                    var element = [];
                    for ( let item of this.dataUsd ){
                        if ( !isUndefined( item['value'] ) )
                            dataUsd.push( item['value']  );
                        if ( !isUndefined( item['key'] ) )
                            element.push(  this.datePipe.transform(item['key'], 'dd/MM') );
                    }
                    this.deviseChartData[0]= {
                        "label" : "Usd",
                        borderColor : "rgb(1, 1, 242)",
                        "data": ( dataUsd.length > 0 ) ? dataUsd : [],
                    };
                    this.deviseChartLabels = ( element.length > 0 ) ? element : [];
                }
                if ( this.dataEur.length > 0 ){
                    var data = [];
                    for ( let item of this.dataEur ){
                        if ( !isUndefined( item['value'] ) )
                            data.push( item['value'] );
                    }
                    this.deviseChartData[1]= {
                        "label" : "Eur",
                        borderColor: "rgb(225, 0, 0)",
                        "data": ( data.length > 0 ) ? data : [],
                    };
                }
            }
        });

        this._data.getWpData('/bfm/cours_devises');
        //this._data.getWpData('./assets/data/cours-devise.json', true);
    }

    // Derniere operation bouclée
    private getLatestOps() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LATEST_OPS) {
                // console.log (art.data.data);
                this.latestOps = art.data.data.content;
                this.lastUpdate = (art.data.data.content.last_update) ? art.data.data.content.last_update : "";
                this.operationOps = (art.data.data.content.operations) ? art.data.data.content.operations : "";
                this.heureCron = ( art.data.data.heure ) ? art.data.data.heure : [];
            }
        });

        this._data.getWpData('/bfm/operation_boucle');
        //this._data.getWpData('./assets/data/derniere-operation.json', true);
    }

    // Taux Directeur
    private getTauxDir() {

        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.TAUX_DIR) {
                // console.log (art.data.data);
                this.tauxDir = art.data.data;
                this.tauxChartData [0] = {
                    "data": (art.data.data.taux ) ? art.data.data.taux : [],
                };
                this.tauxChartLabels = ( art.data.data.dates ) ? art.data.data.dates : [];
            }
        });

        this._data.getWpData('/bfm/taux_directeur');
        //this._data.getWpData('./assets/data/taux-directeur.json', true);
    }

    // Coeff de reserve
    private getCoeffReserve() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.COEFF_RES) {
                this.coeffChartData [0] = {
                    "data": ( art.data.data.taux ) ? art.data.data.taux : [],
                };
                this.coeffChartLabels = (art.data.data.dates) ? art.data.data.dates : [];
            }
        });

        this._data.getWpData('/bfm/coeff_reserve_obligatoire');
        //this._data.getWpData('./assets/data/coeff-reserve.json', true);
    }

    // Reserves en devises
    private getDevisesReserve() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.RESERVE) {
                this.reserveChartData [0] = {
                    "data": ( art.data.data.taux ) ? art.data.data.taux : [],
                };
                this.reserveChartLabels = art.data.data.dates;
            }
        });

        //this._data.getWpData('/bfm/reserve_change');
        this._data.getWpData('/bfm/reserve_change');
    }

    // Derniere operation
    private getDernierOperation() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DERNIER_OPERATIONS) {
                this.dernierOperationMontant = (art.data.data.montants) ? art.data.data.montants : '';
                this.dernierOperationTauxPonderer = (art.data.data.tauxPonderer) ? art.data.data.tauxPonderer : [];
                this.dernierOperationDate = ( art.data.data.date ) ? art.data.data.date : "";
                this.dernierOperationMontantFirst = ( art.data.data.montants && art.data.data.montants.firstChild ) ? art.data.data.montants.firstChild : [];
                this.dernierOperationMontantSecond = ( art.data.data.montants && art.data.data.montants.secondChild ) ? art.data.data.montants.secondChild : [];

            }
        });

        this._data.getWpData('/bfm/derniere_operation');
    }

    /*private highlightActivePanel ( _panelId, _state, _accordion) {
        // console.log(_accordion);
        for (let item of _accordion.panels._results) {
            let el = document.getElementById(item.id + '-header');
            // console.log ( item.isOpen === true );
            if (_panelId == item.id && _state == true) {
                el.className = "card-header active";
            } else {
                el.className = "card-header";
            }
        }
    }*/

    /*public beforeChange($event: NgbPanelChangeEvent, acc) {
        this.highlightActivePanel ( $event.panelId, $event.nextState, acc)
    };*/

    chartOptions = this.returnOptions();
    reserveChartOptions = this.returnOptions({
        ticks: {
            beginAtZero: false,
            stepSize: 0.01
        }
    });
    deviseChartOptions = this.returnDeviseOptions({
        ticks: {
            beginAtZero: false,
            stepSize : 100
        }
    });

    loadLastestOps() {
        setInterval(() => {
            var now = new Date();
            const myFormattedDate = this.datePipe.transform(now, 'HH:mm');
            this.setLastestOps();
        }, 60000);
    }

    setLastestOps() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.LATEST_OPS) {
                // console.log (art.data.data);
                this.latestOps = art.data.data.content;
                this.lastUpdate = (art.data.data.content.last_update) ? art.data.data.content.last_update : "";
                this.operationOps = (art.data.data.content.operations) ? art.data.data.content.operations : "";
                this.heureCron = ( art.data.data.heure ) ? art.data.data.heure : [];
            }
        });

        this._data.getWpDataNoLoading('/bfm/operation_boucle');
    }
    setCurrancyRate() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DEVISES) {
                this.currencies = ( art.data.data.content ) ? art.data.data.content : [];
                this.dateNow =( art.data.data.date ) ? art.data.data.date : "";
                this.dataEur = ( art.data.data.datagraph && art.data.data.datagraph.dataEuro ) ? this.transformObjetToArray(art.data.data.datagraph.dataEuro) : [];
                this.dataUsd = ( art.data.data.datagraph && art.data.data.datagraph.dataUsd ) ? this.transformObjetToArray(art.data.data.datagraph.dataUsd) : [];
                if ( this.dataUsd.length > 0 ){
                    var dataUsd = [];
                    var element = [];
                    for ( let item of this.dataUsd ){
                        if ( !isUndefined( item['value'] ) )
                            dataUsd.push( item['value']  );
                        if ( !isUndefined( item['key'] ) )
                            element.push(  this.datePipe.transform(item['key'], 'dd/MM') );
                    }
                    this.deviseChartData[0]= {
                        "label" : "Usd",
                        borderColor : "rgb(1, 1, 242)",
                        backgroundColor : "rgba(1, 1, 242, 0.2)",
                        "data": ( dataUsd.length > 0 ) ? dataUsd : [],
                    };
                    this.deviseChartLabels = ( element.length > 0 ) ? element : [];
                }
                if ( this.dataEur.length > 0 ){
                    var data = [];
                    for ( let item of this.dataEur ){
                        if ( !isUndefined( item['value'] ) )
                            data.push( item['value'] );
                    }
                    this.deviseChartData[1]= {
                        "label" : "Eur",
                        borderColor: "rgb(225, 0, 0)",
                        backgroundColor: "rgb(225, 0, 0, 0.2)",
                        "data": ( data.length > 0 ) ? data : [],
                    };
                }
            }
        });

        this._data.getWpDataNoLoading('/bfm/cours_devises');
        //this._data.getWpData('./assets/data/cours-devise.json', true);
    }

    loadCurrancyRate(){
        setInterval(() => {
            var now = new Date();
            const myFormattedDate = this.datePipe.transform(now, 'HH:mm');
            if ( this.heureCron.indexOf( myFormattedDate ) !== -1 ){
                this.setCurrancyRate();
            }
        }, 60000);
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

        // Taux Directeur
    private getTauxRefOperation() {

        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.TAUX_REF_INTERBANQUE) {
               if(art.data.data) {
                    this.tauxOpeMonetaire = art.data.data.TAUX +" %";
                    this.dernierDateOpeMonetaire = art.data.data.D_DATE;
               }
               
            }
        });

        this._data.getWpData('/bfm/taux_interbancaire');
        //this._data.getWpData('./assets/data/taux-directeur.json', true);
    }

}
