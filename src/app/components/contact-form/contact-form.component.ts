import {Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {
    codeWS, DataService, SITE_NAME, NOMBRE_AFFICHAGE_OFFRE, SITE_KEY,
    SITE_KEY_SECRET
} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BrowserModule} from '@angular/platform-browser';
import {ReCaptcha2Component} from "ngx-captcha";
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ContactFormComponent implements OnInit {
    contactForm: FormGroup;
    titlePage : any;
    modalRef: BsModalRef;
    errorCaptcha : any = "";
    listMetier : any;
    listMessage : any;
    loader : boolean = false;
    cleSite = SITE_KEY;
    cleSiteSecret = SITE_KEY_SECRET;

    public captchaIsLoaded = false;
    public captchaSuccess = false;
    public captchaIsExpired = false;
    public captchaResponse?: string;

    public theme: 'light' | 'dark' = 'light';
    public size: 'compact' | 'normal' = 'normal';
    public setLanguage = 'fr';
    public type: 'image' | 'audio';

    @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
    @ViewChild('langInput') langInput: ElementRef;

    @ViewChild('template') templateModal: ElementRef;
    tags: string;
    constructor(
        private fb: FormBuilder,
        private _head: HeadService,
        private _data: DataService,
        private modalService: BsModalService,
        private meta: Meta
    ) {
        this.createForm();
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.FORMULAIRE_CONTACT_LIST) {
                this.titlePage = "Nous contacter" + ' | ' + SITE_NAME ;
                this._head.setPageTitle(this.titlePage);
                this.listMetier = this.transform(art.data.data.list_metier);
                this.listMessage = this.transform(art.data.data.list_message);
                // add Tag
                this.tags = ( art.data.meta.tags ) ? art.data.meta.tags : '';
                if( this.tags != '' ){
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if(art.data.meta.description !='' ){
                    this.meta.addTag({name: 'description', content: art.data.meta.description});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
        });

        this._data.getWpData('/bfm/liste-select-contact');
    }

    private createForm () {
        this.contactForm = this.fb.group({
            name: ['', Validators.required], // <--- the FormControl called "name"
            lastname: ['', Validators.required], // <--- the FormControl called "name"
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])), // <--- the FormControl called "name"
            job: ['', Validators.required], // <--- the FormControl called "name"
            subject: ['', Validators.required], // <--- the FormControl called "name"
            message: ['', Validators.required], // <--- the FormControl called "name",
        });
    }
    account_validation_messages = {
        'name' :[
            {type : 'required', message : 'Le nom est requis.'},
        ],
        'lastname' :[
            {type : 'required', message : 'Le prénom est requis.'},
        ],
        'email' :[
            {type : 'required', message : 'L\'adresse email est requise.'},
            {type : 'pattern', message : 'L\'adresse email n\'est pas valide.'},
        ],
        'job' :[
            {type : 'required', message : 'Le métier est requis.'},
        ],
        'subject' :[
            {type : 'required', message : 'Le sujet est requis.'},
        ],
        'message' :[
            {type : 'required', message : 'Le message est requis.'},
        ],
    };
    onSubmitContact( _dataForm:any ){
        if ( this.captchaSuccess ){
            this._data.postWpData( '/bfm/contact', _dataForm );
            this._data.dataResponse.subscribe(art => {
                // console.log("code : ", art.code  );
                if ( art.code === codeWS.FORMULAIRE_CONTACT ) {
                    if ( art.data.data ){
                        this.openModal(this.templateModal);
                        this.contactForm.reset();
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
        //this.cdr.detectChanges();
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
    }

    getResponse(): void {
        const response = this.captchaElem.getResponse();
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

    transform(value) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
    loaderElement = function (){
        if ( this.captchaSuccess ){
            this.loader = true;
        }
    }


}
