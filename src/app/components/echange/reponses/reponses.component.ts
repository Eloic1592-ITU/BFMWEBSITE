import {Component,Input, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {codeWS, DataService, SITE_NAME,NOMBRE_AFFICHAGE_REPONSE} from "../../../services/data.service";
import {HeadService} from "../../../services/head.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BrowserModule} from '@angular/platform-browser';
import {ReCaptcha2Component} from "ngx-captcha";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-reponses',
    templateUrl: './reponses.component.html',
    styleUrls: ['./reponses.component.scss']
})
export class ReponsesComponent implements AfterViewInit {
    title : string;
    themathique: string;
    urlBaseEchange: string;
    sujet: any;
    listReponses: object;
    formIsOpen: boolean = false;
    formElem: any;
    private fragment: string;
    itemsCount : number=0;
    itemsPerPage : number = NOMBRE_AFFICHAGE_REPONSE;
    currentPage : number;
    nextText : any = "Suivant";
    previousText : any = "Précédent";
    lastText : any = "Dernier";
    firstText : any = "Premier";
    maxSize = 8;
    currentTheme: any;
    currentSujet: any;
    reponseParent: any;
    reponseTo: any;
    sujetId:any
    @ViewChild('formResp', { read: ElementRef }) section:ElementRef;

    reponseForm: FormGroup;
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

    constructor(
                    private _data: DataService,
                    private fb: FormBuilder,
                    private _head: HeadService,
                    private modalService: BsModalService,
                    private _datas: DataService,
                    private route: ActivatedRoute,
                    private router: Router
                ) {

                this.route.params.subscribe( params => {
                    if (params['cat'] && params['sujet']) {
                        this.loadDetails(params['cat'], params['sujet']);
                    }
                })
    this.createForm();
    }

    ngOnInit() {
        /*this._activeRoute.fragment.subscribe(fragment => {
            this.fragment = fragment;
            console.log (this.fragment);
        });*/

        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.ESPACE_ECHANGE_SUJET) {
                this.title = art.data.data.title;
                this.themathique = art.data.data.categorie;
                this.urlBaseEchange = art.data.data.url_base_echange;
                this.sujet = art.data.data.sujet;
                this.sujetId = art.data.data.sujet.id;
                this.listReponses = art.data.data.reponses;
                this._head.setPageTitle(this.sujet.sujet+" - "+this.themathique+" -" +this.title + ' | ' + SITE_NAME);
                this.itemsCount = ( art.data.data.count ) ? art.data.data.count : 0;
                this.itemsPerPage = NOMBRE_AFFICHAGE_REPONSE;
            }
        });


    };

    ngAfterViewInit () {
        this.formElem = this.section.nativeElement;
    };

    showResponseForm (_idParent,_user) {

        this.formIsOpen = true;
        const timerid = setTimeout(() => {
            this.formElem.scrollIntoView({behavior: "smooth"});
        }, 500);

        //this.reponseParent = _idParent;
        this.reponseForm.get('reponseParent').setValue(_idParent);
        this.reponseForm.get('sujetId').setValue(this.sujetId);
        this.reponseTo = _user;
    }

    loadDetails (cat: string, sujet: string) {
        //this._data.getWpData('./assets/data/espace-echange-sujet-reponses.json', true);
        this.currentTheme = cat;
        this.currentSujet = sujet;
        this._data.getWpData('/bfm/forum-detail-sujet?term_slug=' + cat +"&sujet_slug="+sujet);
    }

    pageChanged(event: any): void {
        this._data.getWpData("/bfm/forum-detail-sujet?term_slug=" + this.currentTheme+"&sujet_slug="+this.currentSujet+"&paged="+event.page);
    }

    private createForm () {
        this.reponseForm = this.fb.group({
            pseudo: ['', Validators.required],
            sex: ['', Validators.required],
            message: ['', Validators.required],
            reponseParent : [this.reponseParent],
            sujetId : [this.sujetId],
        });
    }
    account_validation_messages = {
        'pseudo' :[
            {type : 'required', message : 'Le pseudo est requis.'},
        ],
        'sex' :[
            {type : 'required', message : 'Le sexe est requise.'},
        ],
        'message' :[
            {type : 'required', message : 'Le message est requis.'},
        ],
    };
    onSubmitReponse( _dataForm:any ){

        if ( this.captchaSuccess ){
            this.loader = true;
            this._datas.postWpData( '/bfm/form-reponse', _dataForm );


            this._datas.dataResponse.subscribe(art => {
                //console.log("code : ", art.code  );
                if ( art.code === codeWS.FORM_REPONSE ) {
                    if ( art.data.data ){
                        this.openModal(this.templateModal);
                        this.reponseForm.reset();
                        this.reset();
                        this.handleExpire();
                        this.errorCaptcha = "";
                        this.reponseForm.get('sujetId').setValue(this.sujetId);
                        this.formIsOpen = false;
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

    hideModal(){
        this.modalRef.hide();
        this.modalService.hide(1);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("modal-open");
    }

}
