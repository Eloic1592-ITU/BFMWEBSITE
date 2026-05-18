import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {forEach} from '@angular/router/src/utils/collection';
import "../../../../node_modules/font-awesome/css/font-awesome.css";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    @Input() data: any[];

    constructor() {

    }

    ngOnInit() {


        let tab = [];
        this.data.forEach(function (element) {
            tab.push({

                small: element.attachement_thumb,
                medium: element.attachement_full,
                big: element.attachement_full,
                description: element.title

            });
        });
        this.galleryImages = tab;

        this.galleryOptions = [
            {"imageDescription": true, "width": "100%", "height": "600px"},
            {"breakpoint": 800, "width": "100%", "height": "600px", "thumbnailsColumns": 4},
            {"breakpoint": 500, "width": "100%", "height": "600px", "thumbnailsColumns": 2}
        ];


    }

}
