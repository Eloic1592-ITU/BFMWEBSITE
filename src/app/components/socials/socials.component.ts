import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService, codeWS } from '../../services/data.service';

@Component({
    selector: 'app-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SocialsComponent implements OnInit {

    shareList = [];
    share: any;

    constructor(private _data: DataService) { }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.HEADER ) {
                this.share = art.data.data.reseaux_sociaux;
                this.shareList = Object.keys(this.share).filter( i => {
                    return this.share[i] != '';
                })
                    .map(i => {
                        let _tmp = {};
                        _tmp[i.toLowerCase()] = this.share[i];
                        return _tmp;
                    });
            }
        });
    }

}
