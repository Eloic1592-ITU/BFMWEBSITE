import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
// import {FormGroup} from "@angular/forms";
import {codeWS, DataService, SITE_NAME, NOMBRE_AFFICHAGE_RESULTAT_RECHERCHE} from '../../services/data.service';
import {HeadService} from '../../services/head.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
    itemsCount : number=0;
    contentData : any;
    posttypes : any = [];
    after_week: any = 0;
    after_month: any = 0;
    after_year: any = 0;
    itemsPerPage : number = NOMBRE_AFFICHAGE_RESULTAT_RECHERCHE;
    currentPage : number;
    titlePage : any;
    nextText : any = "Suivant";
    previousText : any = "Précédent";
    queryString: string;
    isFilterClose = true;
    listePostTypeSelected = [];
    dateSelected = '';
    weekChecked: any = false;
    monthChecked: any = false;
    yearChecked: any = false;
    isFirstLoad: any = true;
    lastText : any = "Dernier";
    firstText : any = "Premier";
    maxSize = 8;
    mobileNextText: string = "";
    mobilePreviousText: string = "";
    mobileLastText: string = "";
    mobileFirstText: string = "";
    mobileMaxSize: number = 4;
    constructor(
        private _route: ActivatedRoute,
        private _data: DataService,
        private _head: HeadService,
        private router: Router
    ) {
        this._route.params.subscribe( params => {
            if (params['query']) {
                this.doSearch(params['query']);
            }
        })
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            //this.currentPage = 1;
            if ( art.code === codeWS.PAGE_RESULTAT_RECHERCHE ) {
                this.contentData = art.data.data.posts;
                this.posttypes = art.data.data.posttypes;
                this.after_week = ( art.data.data.dates.after_week ) ? art.data.data.dates.after_week : 0;
                this.after_month = ( art.data.data.dates.after_month ) ? art.data.data.dates.after_month : 0;
                this.after_year = ( art.data.data.dates.after_year ) ? art.data.data.dates.after_year : 0;
                this.itemsCount = ( art.data.data.count ) ? art.data.data.count : 0;
                this.itemsPerPage = NOMBRE_AFFICHAGE_RESULTAT_RECHERCHE;
                this.titlePage = art.message + ' | ' + SITE_NAME ;
                this._head.setPageTitle(this.titlePage);
            }


        });
    }

    doSearch (_query) {
        this.queryString = _query;
        this._data.getWpData('/bfm/results_search?s=' + this.queryString );
    }

    pageChanged(event: any): void {
        var stringPostTypes = this.listePostTypeSelected.join('_');
        this._data.getWpData("/bfm/results_search?s=" + this.queryString+"&paged="+event.page+"&posttypes="+stringPostTypes+"&date="+this.dateSelected);
    }

    doReSearch () {
        if (this.queryString.trim() !== '') {
            this.isFirstLoad = true;
            this.listePostTypeSelected = [];
            this.weekChecked    =   false;
            this.monthChecked   =   false;
            this.yearChecked    =   false;
            this.router.navigateByUrl('/recherche/'+this.queryString, { skipLocationChange: false });
        }
    }


    changePostTypeFilter(ev, value):any{
        if (ev.target.checked) {
            this.listePostTypeSelected.push(value);
        }
        else
        {
            var arr = this.listePostTypeSelected;
            var i = arr.length;
            while( i-- ) if(arr[i] === value ) arr.splice(i,1);
            this.listePostTypeSelected = arr;

        }
        this.updateFilter();
    }


    changeDateFilter(ev, value):any{


        if (ev.target.checked) {
            this.dateSelected = value;
            if(value != "week") this.weekChecked    =   false;
            if(value != "month") this.monthChecked   =   false;
            if(value != "year") this.yearChecked    =   false;
        }
        else
        {
            this.dateSelected = '';
            if(value == "week") this.weekChecked    =   false;
            if(value == "month") this.monthChecked   =   false;
            if(value == "year") this.yearChecked    =   false;

        }
        this.updateFilter();
    }


    updateFilter(){
        var stringPostTypes = this.listePostTypeSelected.join('_');
        var request = "/bfm/results_search?s=" + this.queryString+"&paged=1"+"&posttypes="+stringPostTypes+"&date="+this.dateSelected;
        this.isFilterClose = false;
        this.currentPage = 1;
        this._data.getWpData(request);
        this.isFirstLoad = false;
        //console.log(request);
    }

    checkList(string){
        var arr = this.listePostTypeSelected;
        var i = arr.length;
        while( i-- ) if(arr[i] === string ) return true;

        return false;
    }

    initFilter(){
        this.listePostTypeSelected = [];
        this.weekChecked    =   false;
        this.monthChecked   =   false;
        this.yearChecked    =   false;
        this.dateSelected   =   '';
        this.updateFilter();
    }
}
