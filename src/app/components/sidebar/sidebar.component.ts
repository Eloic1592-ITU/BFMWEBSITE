///<reference path="../../../../node_modules/@angular/forms/src/directives/validators.d.ts"/>
import {Component, OnInit, TemplateRef} from '@angular/core';
import { DataService, codeWS,TAB_KEY_INFLATION } from "../../services/data.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    inscriptionNewsleter : FormGroup;
    sidebarList = [];
    angleValue: number = 0;
    formSubmit = false;
    lienActive : any;
    keyMenuRigh : any;
    constructor(
        private _data: DataService,
        private fb:FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.createForm();
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.SIDEBAR ) {
                this.sidebarList = art.data.data;
                //console.log (this.sidebarList);
                this.sidebarList.forEach( value =>  {
                    if (value.type == 'taux_inflation') {
                        // console.log( parseFloat(value.pourcentage.replace(',','.')) );
                        this.angleValue = Math.round(parseFloat(value.pourcentage.replace(',','.')) * 180 / 15) ;
                    }
                });
            }
        });

        this._data.getWpData('/bfm/sidebar');

        this.router.events.subscribe((data:any) => {

            if(data instanceof NavigationEnd &&  this.router.url != '/'){
                this.lienActive = this.getCurrentUrl(this.router.url);
                this.keyMenuRigh = this.getKeyMenuRight(this.router.url);
            }


        });

    };


    private createForm( ){
        // console.log(this);
        var that = this;
        this.inscriptionNewsleter = this.fb.group({
           email : new FormControl( "", Validators.compose([
               Validators.required,
               Validators.email,
               ])),
        });
    };
    newsletter_validation_messages = {
        'email' : [
            {type : 'required', message : 'L\'adresse email est requise.'},
            {type : 'email', message : 'L\'adresse email n\'est pas valide.'},
            {type : 'emailExist', message : "Vous êtes déjà abonné à notre newsletter"},
        ]
    };
    onSubmitInscriptionNewsleterForm(_dataForm){
        var formData = new FormData();
        for ( let key in _dataForm ){
            formData.append( key, _dataForm[key] );
        }
        this._data.postWpData( '/bfm/email_exist_newsletter', formData );
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.INSCRIPTION_NEWSLETTER ) {
                if ( art.data.data ){
                    this.formSubmit = true;
                } else {
                    this.inscriptionNewsleter.controls['email'].setErrors({emailExist : true});
                    this.formSubmit = false;
                }
            }
        });
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
        return "/"+_match+"/";
    }
}

