import {Component, OnInit,  ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {HeadService} from "../../../services/head.service";
import {codeWS, DataService, SITE_NAME, NOMBRE_AFFICHAGE_SUJET} from "../../../services/data.service";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
    title : string;
    theme: string;
    urlBaseEchange: string;
    listSujets: object;
    formIsOpen: boolean = false;
    formElem: any;
    itemsCount : number=0;
    itemsPerPage : number = NOMBRE_AFFICHAGE_SUJET;
    currentPage : number;
    nextText : any = "Suivant";
    previousText : any = "Précédent";
    lastText : any = "Dernier";
    firstText : any = "Premier";
    maxSize = 8;
    currentTheme: any;
    @ViewChild('formResp', { read: ElementRef }) section:ElementRef;

  constructor(private _data: DataService,
              private _head: HeadService,
              private route: ActivatedRoute,
              private router: Router
             ) {
                this.route.params.subscribe( params => {
                    if (params['cat']) {
                        this.loadDetails(params['cat']);
                    }
                })
            }

  ngOnInit() {
      this._data.dataResponse.subscribe(art => {
          if ( art.code === codeWS.ESPACE_ECHANGE_THEME ) {
              this.title = art.data.data.title;
              this.theme = art.data.data.categorie;
              this.urlBaseEchange = art.data.data.url_base_echange;
              this.listSujets = art.data.data.sujets;
              this._head.setPageTitle(this.theme +" - " +this.title+ ' | ' + SITE_NAME);
              this.itemsCount = ( art.data.data.count ) ? art.data.data.count : 0;
              this.itemsPerPage = NOMBRE_AFFICHAGE_SUJET;
          }
      });


  }

    ngAfterViewInit () {
        // console.log(this.section.nativeElement);
        this.formElem = this.section.nativeElement;
    };

    showResponseForm () {

        this.formIsOpen = true;

        const timerid = setTimeout(() => {
            this.formElem.scrollIntoView();
        }, 500);
    }

    loadDetails (cat: string) {
       //this._data.getWpData('./assets/data/espace-echange-themes.json', true);
       this.currentTheme = cat;
       this._data.getWpData('/bfm/forum_list_sujet?term_slug=' + cat );
    }

    pageChanged(event: any): void {
        this._data.getWpData("/bfm/forum_list_sujet?term_slug=" + this.currentTheme+"&paged="+event.page);
    }

    createNewSujet(){
        this.router.navigateByUrl('/espace-echange/posez-votre-question/'+this.currentTheme);
    }

}
