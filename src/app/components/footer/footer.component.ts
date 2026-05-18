import { Component, OnInit } from '@angular/core';
import { DataService, codeWS } from "../../services/data.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    menuList = [];
    themeOptions: any;
    cookieValue : any = "";
    constructor(private _data: DataService, private cookieService : CookieService) { }

  ngOnInit() {
      this._data.dataResponse.subscribe(art => {
          if ( art.code === codeWS.MENU_FOOTER ) {
              this.menuList = art.data.data.menu;
              // console.log (this.menuList);
              this.cookieValue = this.cookieService.get( 'infos_cookies' );
          }

          if ( art.code === codeWS.HEADER ) {
              this.themeOptions = art.data.data;
          }
      });

      this._data.getWpData('/bfm/menu?menu_name=footer');
  }

    acceptCookie(){
        this.cookieValue = "098f6bcd4621d373cade4e832627b4f6";
        this.cookieService.set('infos_cookies', "098f6bcd4621d373cade4e832627b4f6", 93 * 24 * 60 * 60 * 1000);
    }

}
