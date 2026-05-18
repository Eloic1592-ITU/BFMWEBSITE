///<reference path="../../../../node_modules/@types/node/index.d.ts"/>
import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService, SITE_NAME, YEARS_DEBUT_MENSUELLE_EN_ARIARY} from "../../services/data.service";
import {HeadService} from "../../services/head.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {isUndefined} from "util";
import { Meta } from '@angular/platform-browser';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
    selector: 'app-document-filter',
    templateUrl: './document-filter.component.html',
    styleUrls: ['./document-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentFilterComponent implements OnInit {
    submenuData: Array<string>;
    title: string;
    titlePage: string;
    filArianeData: Array<any>;
    filterPdf: Array<any>;
    filterDateForm : FormGroup;
    yearSelected : string = "";
    pathFilterPdf : string;
    urlPdf : string = "";
    pathPdf : string = "";
    pathExcel : string = "";
    pdfSizeFile : string ="";
    excelSize : string ="";
    loader: boolean = false;
    tags: any;
    descriptionPage : string;
    zoomCount : number = 1;
    modalRef : BsModalRef;
    @ViewChild('template') templateModal: ElementRef;
    constructor(private _data: DataService,
                private route: ActivatedRoute,
                private _head: HeadService,
                private router: Router,
                private fb: FormBuilder,
                private datePipe: DatePipe,
                private modalService : BsModalService,
                private meta: Meta) {
        this.route.params.subscribe(params => {
            if (params['slug']) {
                this._data.getWpData('/bfm/page?url=' + params['slug']);
            }
            this.createForm();
        });
    }

    ngOnInit() {
        this._data.dataResponse.subscribe(art => {
            if (art.code === codeWS.PAGE_STANDARD) {
                this.submenuData = ( art.data.data.submenu  ) ? art.data.data.submenu : [];
                this.title = art.data.data.content.title;
                this.titlePage = art.data.data.content.title + ' | ' + SITE_NAME;
                this.filArianeData = ( art.data.data.submenu && art.data.data.submenu.fil_ariane ) ? art.data.data.submenu.fil_ariane : [];
                this.descriptionPage = ( art.data.data.content.description ) ? art.data.data.content.description : "";
                this.filterPdf = ( art.data.data.content.filterPdf ) ? this.transformObjetToArray(art.data.data.content.filterPdf) : [];
                this.pathFilterPdf = ( art.data.data.content.pathFilterPdf ) ? art.data.data.content.pathFilterPdf : ""
                this._head.setPageTitle(this.titlePage);
                // add Tag
                this.tags = (art.data.data.content && art.data.data.content.tags) ? art.data.data.content.tags : '' ;
                if( this.tags != '' ){
                    this.meta.addTag({name: 'keywords', content: this.tags});
                }
                if(art.data.data.content && art.data.data.content.description_tags != ''){
                    this.meta.addTag({name: 'description', content: art.data.data.content.description_tags});
                }
                this.meta.addTags([
                    {name: 'copyright', content: SITE_NAME},
                    {name: 'language', content: 'fr'},
                    {name: 'robots', content: 'index,follow'},
                    {name: 'url', content: document.location.href}
                ]);
            }
        });
    }

    private createForm() {
        var start = new Date("1/1/2001");
        this.filterDateForm = this.fb.group({
            filterDoc: ["", Validators.required],
        });
    }

    transformObjetToArray(_value) : any {
        let keys = [];
        if (!isUndefined(_value)) {
            for (let key in _value) {
                keys.push({key: key, value: _value[key]});
            }
        }
        return keys;
    }

    onSubmitFiltre(_dataForm){
        this.zoomCount = 1;
        if ( _dataForm ){
            this.loader = true;
            var formData = new FormData();
            formData.append( 'path', this.pathFilterPdf );
            for ( let key in _dataForm ){
                formData.append( key, _dataForm[key] );
            }
            this._data.postWpData( '/bfm/document_pdf_filter', formData );
            this._data.dataResponse.subscribe(art => {
                if (art.code === codeWS.DOCUMENT_PDF_DONWLODER) {
                    this.urlPdf = ( art.data.data.urlPdf ) ? art.data.data.urlPdf : "";
                    this.pathPdf = ( art.data.data.pathPdf ) ? art.data.data.pathPdf : "";
                    this.pathExcel = ( art.data.data.pathExcel ) ? art.data.data.pathExcel : "";
                    this.pdfSizeFile = ( art.data.data.pdfSize ) ? art.data.data.pdfSize : "";
                    this.excelSize = ( art.data.data.excelSize ) ? art.data.data.excelSize : "";
                }
            });
        }
    }


    incZoom() {
        this.openModal(this.templateModal);
    }

    openModal(template: ElementRef<any>) {
        this.modalRef = this.modalService.show(template, {class :"rectification"});
    }

    decrZoom() {
        if ( this.zoomCount > 0 )
            this.zoomCount -= 0.05;
    }

    pageRendered(e){
        this.loader = false;
    }

}
