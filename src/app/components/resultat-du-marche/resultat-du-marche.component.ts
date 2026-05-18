import {Component, OnInit} from '@angular/core';
import {codeWS, DataService} from "../../services/data.service";
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {isUndefined} from "util";

@Component({
    selector: 'app-resultat-du-marche',
    templateUrl: './resultat-du-marche.component.html',
    styleUrls: ['./resultat-du-marche.component.scss']
})
export class ResultatDuMarcheComponent implements OnInit {
    contentDevise: Array<object>;
    dateNow: string = '';
    referenceEur: Array<any>;
    referenceUsd: Array<any>;


    constructor(private _data: DataService) {
        registerLocaleData(localeFr);

    }

    ngOnInit() {
        this._data.getWpData('/bfm/resultat_marcher');
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.RESULTATS_MARCHER) {
                this.contentDevise = ( art.data.data.content && art.data.data.content ) ? art.data.data.content : [];
                this.dateNow = ( art.data.data && art.data.data.date ) ? art.data.data.date : "";
                this.referenceEur = ( art.data.data.reference && art.data.data.reference.tableFirstEur ) ? art.data.data.reference.tableFirstEur : [];
                this.referenceUsd = ( art.data.data.reference && art.data.data.reference.tableFirstUsd ) ? art.data.data.reference.tableFirstUsd : [];
                if (Object.keys(this.referenceEur)[0] != "") {
                    this.referenceEur = this.transformObjetToArray(this.referenceEur[Object.keys(this.referenceEur)[0]]);
                }
                if (Object.keys(this.referenceUsd)[0] != "") {
                    this.referenceUsd = this.transformObjetToArray(this.referenceUsd[Object.keys(this.referenceUsd)[0]]);
                }
            }
        });
        //this.loadingResultatMarcher();
    }

    transformObjetToArray(_value): any {
        let keys = [];
        if (!isUndefined(_value)) {
            for (let key in _value) {
                keys.push({key: key, value: _value[key]});
            }
        }
        return keys;
    }
    setLoadingResultatMarcher(){
        this._data.getWpDataNoLoading('/bfm/resultat_marcher');
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.RESULTATS_MARCHER) {
                this.contentDevise = ( art.data.data.content && art.data.data.content ) ? art.data.data.content : [];
                this.dateNow = ( art.data.data && art.data.data.date ) ? art.data.data.date : "";
                this.referenceEur = ( art.data.data.reference && art.data.data.reference.tableFirstEur ) ? art.data.data.reference.tableFirstEur : [];
                this.referenceUsd = ( art.data.data.reference && art.data.data.reference.tableFirstUsd ) ? art.data.data.reference.tableFirstUsd : [];
                if (Object.keys(this.referenceEur)[0] != "") {
                    this.referenceEur = this.transformObjetToArray(this.referenceEur[Object.keys(this.referenceEur)[0]]);
                }
                if (Object.keys(this.referenceUsd)[0] != "") {
                    this.referenceUsd = this.transformObjetToArray(this.referenceUsd[Object.keys(this.referenceUsd)[0]]);
                }
            }
        });
    }

    loadingResultatMarcher(){
        setInterval(() => {
            this.setLoadingResultatMarcher();
        }, 120000);
    }

}
