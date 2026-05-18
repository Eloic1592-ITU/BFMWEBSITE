import {Component,Input, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../../services/data.service";
import {HeadService} from "../../../services/head.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BrowserModule} from '@angular/platform-browser';
import {ReCaptcha2Component} from "ngx-captcha";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nouveau-sujet',
  templateUrl: './nouveau-sujet.component.html',
  styleUrls: ['./nouveau-sujet.component.scss']
})
export class NouveauSujetComponent implements OnInit {
    title : string;
    subTitle : string;
    urlBaseEchange : string;
    listeThematique = [];
    sujetForm: FormGroup;
    thematique:string;

    public captchaIsLoaded = false;
    public captchaSuccess = false;
    public captchaIsExpired = false;
    public item = false;
    public captchaResponse?: string;
    public theme: 'light' | 'dark' = 'light';
    public size: 'compact' | 'normal' = 'normal';
    public setLanguage = 'fr';
    public type: 'image' | 'audio';

    @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
    @ViewChild('langInput') langInput: ElementRef;
    @ViewChild('template') templateModal: ElementRef;

    modalRef: BsModalRef;
    errorCaptcha : any = "";
    loader : boolean = false;
  constructor( private _data: DataService,
               private fb: FormBuilder,
               private _head: HeadService,
               private modalService: BsModalService,
               private _datas: DataService,
               private route: ActivatedRoute,
               private router: Router) {

      this.route.params.subscribe( params => {
          if (params['cat']) {
              this.thematique = params['cat'];
          }
      })
      this.createForm();
  }

  ngOnInit() {
        this.getThematique();
  }
    // liste thematique
    private getThematique () {
        this._data.dataResponse.subscribe(art => {
            if ( art.code === codeWS.FORMULAIRE_THEMATIQUE_LIST ) {
                this.listeThematique = art.data.data.list_thematique;
                this.title = art.data.data.title;
                this.subTitle = art.data.data.subTitle;
                this._head.setPageTitle(this.subTitle+" -  "+ art.data.data.title + ' | ' + SITE_NAME);
                this.urlBaseEchange = art.data.data.url_base_echange;

            }
        });

        this._data.getWpData('/bfm/liste-select-thematique');
    }
    private createForm () {
        this.sujetForm = this.fb.group({
            pseudo: ['', Validators.required],
            sex: ['', Validators.required],
            theme: [this.thematique, Validators.required],
            message: ['', Validators.required],
        });
    }
    account_validation_messages = {
        'pseudo' :[
            {type : 'required', message : 'Le pseudo est requis.'},
        ],
        'sex' :[
            {type : 'required', message : 'Le sexe est requise.'},
        ],
        'theme' :[
            {type : 'required', message : 'La thématique est requise.'},
        ],
        'message' :[
            {type : 'required', message : 'Le message est requis.'},
        ],
    };
    onSubmitSujet( _dataForm:any ){

        if ( this.captchaSuccess ){
            this.loader = true;
            this._datas.postWpData( '/bfm/form-sujet', _dataForm );


            this._datas.dataResponse.subscribe(art => {
                //console.log("code : ", art.code  );
                if ( art.code === codeWS.FORM_SUJET ) {
                    if ( art.data.data ){
                        this.openModal(this.templateModal);
                        this.sujetForm.reset();
                        this.reset();
                        this.handleExpire();
                        this.errorCaptcha = "";
                    }
                }
                this.loader = false;
            });


        } else {
            this.errorCaptcha = "La validation du captcha est expirée ou n'est pas validée. Veuillez réessayer de nouveau.";
        }

    }
    openModal(template: ElementRef<any>) {
    this.modalRef = this.modalService.show(template);
    }
    handleSuccess(captchaResponse: string): void {
        this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    }

    handleLoad(): void {
        this.captchaIsLoaded = true;
    this.captchaIsExpired = false;

    }

    handleExpire(): void {
        this.captchaSuccess = false;
    this.captchaIsExpired = true;
    }

    changeTheme(theme: 'light' | 'dark'): void {
        this.theme = 'light';
    }

    changeSize(size: 'compact' | 'normal'): void {
        this.size = 'normal';
    }

    changeType(type: 'image' | 'audio'): void {
        this.type = 'image';
    }


    getCurrentResponse(): void {
        const currentResponse = this.captchaElem.getCurrentResponse();
        if (!currentResponse) {
            alert('There is no current response - have you submitted captcha?');
        } else {
            alert(currentResponse);
        }
    }

    getResponse(): void {
        const response = this.captchaElem.getResponse();
        if (!response) {
            alert('There is no response - have you submitted captcha?');
        } else {
            alert(response);
        }
    }

    reload(): void {
        this.captchaElem.reloadCaptcha();
    }

    getCaptchaId(): void {
        alert(this.captchaElem.getCaptchaId());
    }

    reset(): void {
        this.captchaElem.resetCaptcha();
    }

    private highlight(): void {
        const highlightBlocks = document.getElementsByTagName('code');
        for (let i = 0; i < highlightBlocks.length; i++) {
            const block = highlightBlocks[i];
            //hljs.highlightBlock(block);
        }
    }
}
