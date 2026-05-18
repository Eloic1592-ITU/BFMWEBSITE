import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {

    isMobile = environment.mobile;

    constructor() {
    }

    ngOnInit() {
    }

}
