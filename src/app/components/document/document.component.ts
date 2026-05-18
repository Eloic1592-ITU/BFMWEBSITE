import {Component, Input, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BrowserModule} from '@angular/platform-browser';
import {ReCaptcha2Component} from "ngx-captcha";


@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {

    listeDocs = [];
    @Input('titleBlocDoc') titleBlocDoc: any;
    @Input('descBlocDoc') descBlocDoc: any;
    bulletinForm: FormGroup;
    titlePage: any;
    modalRef: BsModalRef;
    errorCaptcha: any = "";
    loader: boolean = false;

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
    listeDocsSelected = [];
    liste_documents: any;
    showForm: any = false;

    constructor(private _data: DataService,
                private fb: FormBuilder,
                private _head: HeadService,
                private modalService: BsModalService,
                private _datas: DataService) {
        this.createForm();
    }

    ngOnInit() {
        this.getDocuments();
    }

    // liste documents
    private getDocuments() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DOCUMENT) {
                this.listeDocs = art.data.data;
            }
        });

        this._data.getWpData('/bfm/documents');
    }

    private createForm() {
        this.bulletinForm = this.fb.group({
            name: ['', Validators.required],
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            telephone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]+$')
            ])),
            liste_documents: ['', Validators.required],
        });
    }

    account_validation_messages = {
        'name': [
            {type: 'required', message: 'Le nom ou raison sociale est requis.'},
        ],
        'email': [
            {type: 'required', message: 'L\'adresse email est requise.'},
            {type: 'pattern', message: 'L\'adresse email n\'est pas valide.'},
        ],
        'telephone': [
            {type: 'required', message: 'Le téléphone est requise.'},
            {type: 'pattern', message: 'Le téléphone n\'est pas valide.'},
        ],
        'liste_documents': [
            {type: 'required', message: 'Vous devez séléctionner au moins un document.'},
        ],
    }

    onSubmitBulletin(_dataForm: any) {

        if (this.captchaSuccess) {
            this._datas.postWpData('/bfm/form-bulletin', _dataForm);


            this._datas.dataResponse.subscribe(art => {
                //console.log("code : ", art.code  );
                if (art.code === codeWS.FORM_BULLETIN) {
                    if (art.data.data) {
                        this.openModal(this.templateModal);
                        this.bulletinForm.reset();
                        this.reset();
                        this.handleExpire();
                        this.errorCaptcha = "";
                        this.listeDocs.forEach((item) => {
                            item.checked = false;
                        })
                        this.listeDocsSelected = [];
                        this.liste_documents = "";
                    }
                }
                this.loader = false;
            });


        } else {
            this.loader = false;
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

    transform(value): any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }

    addToListeSelected(ev, value): any {
        if (ev.target.checked) {
            this.listeDocsSelected.push(value);
        }
        else {
            var arr = this.listeDocsSelected;
            var i = arr.length;
            while (i--) if (arr[i] === value) arr.splice(i, 1);
            this.listeDocsSelected = arr;
        }
        this.updateListSelected();
    }

    updateListSelected(): void {
        var arr = this.listeDocsSelected;
        var i = arr.length;
        var zListe = "";
        while (i--) {
            zListe = zListe + " - " + arr[i] + "\n";
        }
        this.liste_documents = zListe;

        if (!this.showForm && zListe != "") {
            this.showForm = true;
        }

    }

    loaderElement = function () {
        if (this.captchaSuccess) {
            this.loader = true;
        }
    }
}
