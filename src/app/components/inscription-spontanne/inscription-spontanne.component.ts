import {Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HeadService} from "../../services/head.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {codeWS, DataService, SITE_NAME} from "../../services/data.service";
import {ReCaptcha2Component} from "ngx-captcha";
import {Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-inscription-spontanne',
    templateUrl: './inscription-spontanne.component.html',
    styleUrls: ['./inscription-spontanne.component.scss', '../page/page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InscriptionSpontanneComponent implements OnInit {
    candidatureSpontanneForm: FormGroup;
    modalRef: BsModalRef;
    listFiliere: any;
    listDiplome: any;
    listAnnee: any;
    errorCaptcha: string = "";
    loader: boolean = false;
    public captchaIsLoaded = false;
    public captchaSuccess = false;
    public captchaIsExpired = false;
    public captchaResponse?: string;
    public theme: 'light' | 'dark' = 'light';
    public size: 'compact' | 'normal' = 'normal';
    public setLanguage = 'fr';
    public type: 'image' | 'audio';
    @ViewChild('captchaInscription') captchaInscription: ReCaptcha2Component;
    @ViewChild("fileInputCv") fileInputCv;
    @ViewChild("fileInputLm") fileInputLm;
    @ViewChild('template') templateModal: ElementRef;
    private titlePage: string;
    tags: string;

    constructor(private fb: FormBuilder,
                private _head: HeadService,
                private _data: DataService,
                private modalService: BsModalService,
                private meta: Meta) {
        this.createForm();
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            // console.log(art.code)
            if (art.code === codeWS.INSCRIPTION_OFFRE_INFOS) {
                this.titlePage = "Candidature spontanée " + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                this.listAnnee = ( art.data.data.list_annee_exp ) ? this.transform(art.data.data.list_annee_exp) : [];
                this.listDiplome = ( art.data.data.list_diplome ) ? this.transform(art.data.data.list_diplome) : [];
                this.listFiliere = ( art.data.data.liste_filiere ) ? this.transform(art.data.data.liste_filiere) : [];
                // console.log(this.listFiliere);
                // add Tag
                this.tags = (art.data.meta.tags) ? art.data.meta.tags : '';
                if (this.tags != '') {
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if (art.data.meta.description != '') {
                    this.meta.updateTag({name: 'description', content: art.data.meta.description});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
        });

        this._data.getWpData('/bfm/inscription_infos');
    }

    openModal(template: ElementRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    private createForm() {
        this.candidatureSpontanneForm = this.fb.group({
            name: ['', Validators.required],
            phone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^(?:0|\\(?\\+33\\)?\\s?|0033\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$')
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
            ])), // <--- the FormControl called "name"
            diplome_niveau: ['', Validators.required],
            annee_experience: ['', Validators.required],
            filiere: ['', Validators.required],
            cv: ['', Validators.required],
            lettre_motivation: ['', Validators.required],
        });
    }

    onSubmitCandidatureForm(_dataForm: any) {
        if (this.captchaSuccess) {
            var formData = new FormData();
            for (let key in _dataForm) {
                switch (key) {
                    case 'cv':
                        let fiCv = this.fileInputCv.nativeElement;
                        if (fiCv.files && fiCv.files[0]) {
                            formData.append('cv', fiCv.files[0], _dataForm[key]);
                        }
                        break;
                    case 'lettre_motivation':
                        let fiLm = this.fileInputLm.nativeElement;
                        if (fiLm.files && fiLm.files[0]) {
                            formData.append('lettre_motivation', fiLm.files[0], _dataForm[key]);
                        }
                        break;
                    default:
                        formData.append(key, _dataForm[key]);
                        break;
                }

            }
            this._data.postWpData('/bfm/inscription_spontanne', formData);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.INSCRIPTION_SPONTANNE_OFFRE) {
                    if (art.data.data) {
                        this.candidatureSpontanneForm.reset();
                        this.openModal(this.templateModal);
                        this.reset();
                        this.handleExpire();
                        this.errorCaptcha = "";
                    }
                }
                this.loader = false;
            });

        } else {
            this.loader = false;
            this.errorCaptcha = "La validation du captcha est expirée ou n'est pas validée. Veuillez réessayer de nouveau.";
        }
    }

    candidature_spontanne_validation_messages = {
        'name': [
            {type: 'required', message: 'Le nom est requis.'},
        ],
        'phone': [
            {type: 'required', message: 'Le numero de téléphone est requis.'},
            {type: 'pattern', message: 'Le numero de téléphone n\'est pas valide.'},
        ],
        'email': [
            {type: 'required', message: 'L\'adresse email est requise.'},
            {type: 'email', message: 'L\'adresse email n\'est pas valide.'},
        ],
        'diplome_niveau': [
            {type: 'required', message: 'Le métier est requis.'},
        ],
        'annee_experience': [
            {type: 'required', message: 'Le sujet est requis.'},
        ],
        'filiere': [
            {type: 'required', message: 'La filière est requise.'},
        ],
        'cv': [
            {type: 'required', message: 'Le cv est requis.'},
        ],
        'lettre_motivation': [
            {type: 'required', message: 'La lettre de motivation est requise.'},
        ]
    };

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

    reset(): void {
        this.captchaInscription.resetCaptcha();
    }

    transform(value): any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }

    loaderElement = function () {
        if (this.captchaSuccess) {
            this.loader = true;
        }
    }

}
