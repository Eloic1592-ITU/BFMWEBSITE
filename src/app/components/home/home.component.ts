import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// import {DataService, codeWS, SITE_NAME} from "../../services/data.service";
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
// import {ActivatedRoute, Router} from "@angular/router";
// import { Meta } from '@angular/platform-browser';
// import {HeadService} from "../../services/head.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    isMobile = environment.mobile;

    /*private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true,
        hideOnClick: false
    };*/

    constructor() {
    }

    ngOnInit() {

    }

}
