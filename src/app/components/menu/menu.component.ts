import {Component, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import { DataService, codeWS,TAB_KEY_INFLATION } from '../../services/data.service';
import {Router, NavigationEnd, PRIMARY_OUTLET, UrlTree, UrlSegmentGroup, UrlSegment} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
    menuList = [];
    public isCollapsed = true;
    public isSearch = false;
    term: string = "";
    titleMenus = [];
    isMobile = environment.mobile;
    lienActive : any;
    keyMenuActive : any;
    parentActive: string = "";

    @Input() mobile: boolean;

    constructor(private _data: DataService, private renderer: Renderer2, private _route: Router) { }

  ngOnInit() {
      this._data.dataResponse.subscribe(art => {
          if ( art.code === codeWS.MENU_MOBILE || art.code === codeWS.MAIN_MENU ) {
              this.menuList = art.data.data.menu;
              for (let title of this.menuList){
                let titre = title.title.split("/");
                this.titleMenus.push(titre);
              };
          }
      });

      // Get menu parent
      this._data.menuParent.subscribe( _menu => {
          this.parentActive =_menu;
      });

      if (this.isMobile) {
          this._data.DBInitialize.subscribe( loaded => {
              if (loaded) {
                  this._data.getWpData('/bfm/menu?menu_name=mobile');
              }
          });
          // this._data.getWpData('/bfm/menu?menu_name=mobile');
      } else {
         this._data.getWpData('/bfm/menu?menu_name=primary');
      }


      //active recherche
      this._route.events.subscribe((data:any) => {

          if(data instanceof NavigationEnd){

              var urlcurrent  = this._route.url;
              //console.log ('this._route=', this._route);
              if(urlcurrent.indexOf("/recherche/") != -1){
                  this.isSearch = true;
                  const tree: UrlTree =  this._route.parseUrl(urlcurrent);
                  const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
                  const s: UrlSegment[] = g.segments;
                  this.term = s[1].path;
              }
              this.lienActive = this.getCurrentUrl(urlcurrent);
              this.keyMenuActive = this.getKeyMenuRight(urlcurrent);
              //console.log ('this.lienActive=', this.lienActive);
          }


      });
  }

  openMenu () {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
          this.renderer.removeClass(document.body, 'menu-open');
      } else {
          this.renderer.addClass(document.body, 'menu-open');
      }
  }

    doSearch ( ) {

        if (this.term.trim() !== '') {
            // console.log ( this.term );
            this._route.navigate(['/recherche', this.term]);
            this.openMenu();
        }
    }

    getKeyMenuRight(_url){
        _url = _url.substring(1);
        let _match = _url.split('-')[0];
        if(TAB_KEY_INFLATION.indexOf(_match) != -1){
            return "inflation";
        }
        return "";
    }

    getCurrentUrl(_url){
        _url = _url.substring(1);
        let _match = _url.split('/')[1];
        if(_match !== undefined){
            return "/"+_match+"/";
        }
        return "/"+_url+"/";
    }

    isCurrentRoute(j : any) : boolean {

        let childs = this.menuList[j].child;
        for(var i = 0;i<childs.length;i++){

            if(childs[i].url == this.lienActive){
                return true;
            }

            if( this.keyMenuActive != ""
                && this.getKeyMenuRight(childs[i].url) == this.keyMenuActive
            ){
                return true;
            }

        }
    }

}
