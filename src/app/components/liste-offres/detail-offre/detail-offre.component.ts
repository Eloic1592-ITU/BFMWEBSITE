import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {codeWS, SITE_NAME, DataService} from "../../../services/data.service";
import {HeadService} from "../../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ReCaptcha2Component} from "ngx-captcha";
import {Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-detail-offre',
    templateUrl: './detail-offre.component.html',
    styleUrls: ['./detail-offre.component.scss', '../../page/page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailOffreComponent implements OnInit {
    titlePage: any;
    title: any;
    dateExpired: any = "";
    datePublish: any = "";
    descMissionsPrincipale: any = "";
    descResponsabilite: any = "";
    descQuality: any = "";
    descProfil: any = "";
    referenceOffre: any;
    secteurOffre: any;
    lieuOffre: any;
    typeOffre: any;
    idOffre: number;
    errorCaptcha: any = "";
    inscriptionForm: FormGroup;
    modalRef: BsModalRef;
    listFiliere: any;
    listDiplome: any;
    listAnnee: any;
    loader: boolean = false;
    isShowForm: boolean = false;
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
    tags: string;
    url: any;
    viewPartage : boolean;

    constructor(private fb: FormBuilder,
                private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private modalService: BsModalService,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.goTopage(params['id']);
            }
        });
        this.createInscriptionForm();
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.DETAIL_OFFRE) {
                this.title = art.data.data.title;
                this.titlePage = art.data.data.title + ' | ' + SITE_NAME;
                this._head.setPageTitle(this.titlePage);
                this.dateExpired = ( art.data.data.dateExpired ) ? art.data.data.dateExpired: "";

                //
                //Modif Temporeraire :
                //Problème sur le web service 
                //
                if(this.dateExpired != "") {
                    const dateParts = this.dateExpired.split('/');

                    const day = parseInt(dateParts[0], 10) - 1;
                    const month = parseInt(dateParts[1], 10); // Les mois dans JavaScript sont de 0 à 11
                    const year = parseInt(dateParts[2], 10);

                    const date = new Date(year+'-'+month+'-'+day);
                    this.dateExpired = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                }
                

                this.datePublish = ( art.data.data.date ) ? art.data.data.date : "";
                this.descMissionsPrincipale = ( art.data.data.description ) ? art.data.data.description : "";
                this.descResponsabilite = ( art.data.data.responsabilite ) ? art.data.data.responsabilite : "";
                this.descQuality = ( art.data.data.qualite ) ? art.data.data.qualite : "";
                this.descProfil = ( art.data.data.profil ) ? art.data.data.profil : "";
                this.referenceOffre = ( art.data.data.reference ) ? art.data.data.reference : "";
                this.secteurOffre = ( art.data.data.cat_offre ) ? art.data.data.cat_offre : "";
                this.lieuOffre = ( art.data.data.lieu_offre ) ? art.data.data.lieu_offre : "";
                this.typeOffre = ( art.data.data.type_offre ) ? art.data.data.type_offre : "";
                this.idOffre = ( art.data.data.id ) ? parseInt(art.data.data.id) : 0;
                this.listAnnee = ( art.data.data.list_annee_exp ) ? this.transform(art.data.data.list_annee_exp) : [];
                this.listDiplome = ( art.data.data.list_diplome ) ? this.transform(art.data.data.list_diplome) : [];
                this.listFiliere = ( art.data.data.liste_filiere ) ? this.transform(art.data.data.liste_filiere) : [];
                this.viewPartage = ( art.data.data.viewPartage ) ? this.transform(art.data.data.viewPartage) : false;
                // add Tag
                this.tags = ( art.data.data.tags ) ? art.data.data.tags : '';
                //console.log(this.tags);
                if (this.tags != '') {

                    this.meta.updateTag({name: 'keywords', content: this.tags});
                }
                if (art.data.data.resume != '') {
                    this.meta.updateTag({name: 'description', content: art.data.data.resume});
                }

                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
                // update meta tag
                this._head.updateMetaTags(
                    this.title,
                    this.tags,
                    document.location.href,
                    null
                );
                this.url = document.location.href;
                if(art.data.data.a_la_une != '' && art.data.data.a_la_une != false){
                    this.meta.updateTag({property: 'og:image', content: art.data.data.a_la_une});
                }
            }
        });
    }

    openModal(template: ElementRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    goTopage(_pageSlug: string) {
        this._data.getWpData('/bfm/detail-offre?url=' + _pageSlug);
    }

    showFormInscription(): void {
        this.isShowForm = true;
    }

    public createInscriptionForm() {
        this.inscriptionForm = this.fb.group({
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
            postid: [this.idOffre],
        });
    }

    inscription_validation_messages = {
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

    onSubmitinscriptionForm(_dataForm: any) {
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
            this._data.postWpData('/bfm/inscription', formData);
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.INSCRIPTION_OFFRE) {
                    if (art.data.data) {
                        this.inscriptionForm.reset();
                        this.openModal(this.templateModal);
                        this.reset();
                        this.handleExpire();
                        this.errorCaptcha = "";
                        this.inscriptionForm.patchValue({postid: this.idOffre});
                    }
                }
                this.loader = false;
            });

        } else {
            this.loader = false;
            this.errorCaptcha = "La validation du captcha est expirée ou n'est pas validée. Veuillez réessayer de nouveau.";
        }
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


}
