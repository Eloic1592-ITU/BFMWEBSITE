import {Component, OnInit} from '@angular/core';
import {codeWS, DataService} from "../../services/data.service";

@Component({
    selector: 'app-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

    submenuList =[];

    constructor(private _data: DataService) {
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_STANDARD) {
                //console.log('submenu>submenu-service');
                //console.log(art.data.data.submenu.items);
                this.submenuList = art.data.data.submenu.items
            } else if (art.code === codeWS.ACCUEIL) {
                this.submenuList = []
            }
        });
    }

}
