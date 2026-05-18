import {Component, OnInit, HostListener} from '@angular/core';
import { environment } from '../environments/environment';
import {Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from "@angular/router";
import { NotifierService } from 'angular-notifier';
// import {HeadService} from "./services/head.service";
import {DataService} from "./services/data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    isMobile = environment.mobile;
    firstLoaded = true;
    menuIsOpen = false;
    isFullWidth = false;
    private readonly notifier: NotifierService;
    htmlBody = document.getElementsByTagName('body')[0];

    constructor(
        private _route: Router,
        private _notifierService: NotifierService,
        private _dataService: DataService
    ) {
        this._route.events.subscribe(val => {
            if (val instanceof RoutesRecognized && this.firstLoaded) {
                this.firstLoaded = false;
            }
            if (val instanceof NavigationEnd) {
                this.isFullWidth = val.url.startsWith('/eariary');
            }
        });

        this.notifier = _notifierService;
    }

    ngOnInit() {
        if ( this.isMobile ) {
            this._dataService.initAppMobile();
        }

        this._dataService.appNotification.subscribe( _notif => {
            this.notifier.notify( _notif.type, _notif.message );
        })


    }

    onActivate(event) {
        this.scrollToTop();
    }

    scrollToTop () {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event){
        const verticalOffset = window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop || 0;

        console.log("window scrolling : ", verticalOffset);
        if ( verticalOffset > 200 ) {
            this.htmlBody.classList.add('scroll');
        } else {
            this.htmlBody.classList.remove('scroll');
        }
        // this.htmlBody.classList.add('loading');
    }
}
