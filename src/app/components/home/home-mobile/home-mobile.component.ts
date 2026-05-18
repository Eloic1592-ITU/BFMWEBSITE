import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService, codeWS, SITE_NAME} from "../../../services/data.service";
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-home-mobile',
    templateUrl: './home-mobile.component.html',
    styleUrls: ['./home-mobile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeMobileComponent implements OnInit {

    title = 'Banky Foiben\'ny Madagasikara';
    titlePage: string;
    public isCollapsed = true;
    menuHomeList = [];
    titleCta : string;
    linkCta : string;
    imageCta : string;
    operationOps : Array<any>;
    dateNow : string;

    constructor( private _data: DataService, private router: Router ) {
    }

    ngOnInit() {
        console.log("sqdsdqsdqsdqs");
        this._data.dataResponse.subscribe( art => {
            if ( art.code === codeWS.MENU_MOBILE ) {
                this.menuHomeList = art.data.data.menu;
                this.titleCta = ( art.data.data.cta && art.data.data.cta.cta_title ) ? art.data.data.cta.cta_title : '';
                this.linkCta = ( art.data.data.cta && art.data.data.cta.cta_link ) ? art.data.data.cta.cta_link : '';
                this.imageCta = ( art.data.data.cta && art.data.data.cta.cta_image ) ? art.data.data.cta.cta_image : '';
                this.operationOps = (art.data.data.cta && art.data.data.cta.cta_change && art.data.data.cta.cta_change.content && art.data.data.cta.cta_change.content.operations ) ? art.data.data.cta.cta_change.content.operations : [];
                this.operationOps = this.operationOps.reverse();
                this.dateNow = ( art.data.data.cta && art.data.data.cta.cta_change && art.data.data.cta.cta_change.date ) ? art.data.data.cta.cta_change.date : "";

            }
        });

        this._data.getWpData('/bfm/menu?menu_name=mobile');
    }

}
