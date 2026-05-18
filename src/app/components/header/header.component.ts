import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService, codeWS } from '../../services/data.service';
import {Meta} from "@angular/platform-browser";
// import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

    headerComponents: any;
    term: string = "";

    // headerComponents = new headerComp();
    constructor(
        private _data: DataService,
        private meta : Meta
    ) { }

    ngOnInit() {
      this._data.dataResponse.subscribe(art => {
          if ( art.code === codeWS.HEADER ) {
              this.headerComponents = art.data.data;
              this.meta.updateTag({property:'og:image', content: art.data.data.logo_header_transverse});
              // console.log(this.headerComponents);
          }
      });

      this._data.getWpData('/bfm/config_site');
    }

    /*doSearch () {
        if (this.term.trim() !== '') {
            // console.log ( this.term );
            this._route.navigate(['/recherche', this.term]);
        }
    }*/

}
