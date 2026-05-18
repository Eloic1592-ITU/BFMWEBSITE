import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME, NOMBRE_AFFICHAGE_MEDIA} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Meta} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Component({
	selector: 'app-medias',
	templateUrl: './medias.component.html',
	styleUrls: ['./medias.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MediasComponent implements OnInit {
	itemsCount : number=1;
	albumData : any;
	videoData : any;
	itemsPerPage : number = NOMBRE_AFFICHAGE_MEDIA;
	currentPage : number;
	titleTop : string;
	titlePage : string;
	title : string;
	titleModel : string;
	chaineYoutube: any;
	lienPage : any;
	tags : string;
    loadingAnimation : string = environment.webServiceSITEURL + '/chargement.php?width=600&height=350';
    errorImage : string = environment.webServiceSITEURL + '/photo-no-disponible.php?width=600&height=350';
    offset : number = 100;
	constructor(
		private _data: DataService,
		private route: ActivatedRoute,
		private _head: HeadService,
		private router: Router,
		private meta : Meta
		) {
		this.route.params.subscribe(params => {
			if (params['titleModel']) {
				this.titleModel = params['titleModel'];
			}
		});
	}

	ngOnInit() {
		this._data.dataResponse.subscribe(art => {
			if ( art.code === codeWS.PAGE_LISTING_MEDIA ) {
				this.title = art.data.data.titleTop;
				this.titlePage = art.data.data.titleTop + ' | ' + SITE_NAME ;
				this.titleTop = art.data.data.titleTop ;
				this.albumData = art.data.data.albums;
				this.videoData = art.data.data.videos;
				this.itemsCount = art.data.data.count;
				this.itemsPerPage = NOMBRE_AFFICHAGE_MEDIA;
				this.lienPage = art.data.data.lien_page;
				if(this.titleModel != art.data.data.titlePrema){
					this.router.navigate(['404']);
				}
				this._head.setPageTitle(this.titlePage);
			};
			if ( art.code === codeWS.HEADER ) {
				this.chaineYoutube = art.data.data.reseaux_sociaux.Youtube;

			};
            this.tags = (art.data.data && art.data.data.tags) ? art.data.data.tags : '' ;
            if( this.tags != '' ){
                this.meta.addTag({name: 'keywords', content: this.tags});
            }
            if(art.data.data && art.data.data.description_tags != ''){
                this.meta.addTag({name: 'description', content: art.data.data.description_tags});
            }
            this.meta.addTags([
                {name: 'copyright', content: SITE_NAME},
                {name: 'language', content: 'fr'},
                {name: 'robots', content: 'index,follow'},
                {name: 'url', content: document.location.href}
            ]);

		});
        this._data.getWpData('/bfm/media?page');
	}
}
