import {BrowserModule,Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {StickyModule} from 'ng2-sticky-kit';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {NgPipesModule} from 'ngx-pipes';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import { BsDropdownModule } from 'ngx-bootstrap';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { ShareModule } from '@ngx-share/core';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

// Specifics modules
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule }   from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { NgxCaptchaModule } from 'ngx-captcha';
// import { SharedModule } from './common/shared/shared.module';

// Common components
import {DataService, SITE_KEY, SITE_KEY_SECRET} from './services/data.service'
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuComponent} from './components/menu/menu.component';
import {SubmenuComponent} from './components/submenu/submenu.component';
import {SocialsComponent} from './components/socials/socials.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {IndicateursComponent} from './components/indicateurs/indicateurs.component';
import {ChartsModule} from 'ng2-charts';

// Specific components
// import {HomeComponent} from './components/home/home.component';
import {LoaderComponent} from './components/loader/loader.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import {CookieService} from "ngx-cookie-service";
import { TauxReferenceComponent } from './components/taux-reference/taux-reference/taux-reference.component';
// import { ResultatDuMarcheComponent } from './components/resultat-du-marche/resultat-du-marche.component';
// import { MarcherDeChangeComponent } from './components/marcher-de-change/marcher-de-change.component';
// import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
// import { CoursDevisesMensuelleComponent } from './components/cours-devises-mensuelle/cours-devises-mensuelle.component';

// import {PageComponent} from './components/page/page.component';
// import { ContactFormComponent } from './components/contact-form/contact-form.component';
// import { ListeOffresComponent } from './components/liste-offres/liste-offres.component';
// import { FaqComponent } from './components/faq/faq.component';
// import { ListeActualitesComponent } from './components/liste-actualites/liste-actualites.component';
// import { DetailOffreComponent } from './components/detail-offre/detail-offre.component';
// import { InscriptionSpontanneComponent } from './components/inscription-spontanne/inscription-spontanne.component';
// import { DetailActualiteComponent } from './components/detail-actualite/detail-actualite.component';
// import { TextesReglementairesComponent } from './components/textes-reglementaires/textes-reglementaires.component';
// import { CommuniquesComponent } from './components/communiques/communiques.component';
// import { DetailTexteReglementaireComponent } from './components/detail-texte-reglementaire/detail-texte-reglementaire.component';
// import { GalleryComponent } from './components/gallery/gallery.component';
// import { DetailCommuniqueComponent } from './components/detail-communique/detail-communique.component';
// import { DetailAlbumComponent } from './components/detail-album/detail-album.component';
// import { MediasComponent } from './components/medias/medias.component';


/* SWIPER CONFIG */
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    slidesPerView: 1
};

/* NOTIFIER CONFIG */
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 0
        },
        vertical: {
            position: 'bottom',
            distance: 0,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 6
    },
    animations: {
        enabled: true,
        show: {
            preset: 'fade',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SocialsComponent,
        SidebarComponent,
        IndicateursComponent,
        SubmenuComponent,
        // HomeComponent,
        LoaderComponent,
        TauxReferenceComponent,
        // ResultatDuMarcheComponent,
        // MarcherDeChangeComponent,
        // MarcheDeChangeComponent,
        // DocumentFilterComponent,
        // CoursDevisesMensuelleComponent,
        // PageComponent,
        // ContactFormComponent,
        // ListeOffresComponent,
        // FaqComponent,
        // ListeActualitesComponent,
        // DetailActualiteComponent,
        // TextesReglementairesComponent,
        // CommuniquesComponent,
        // DetailTexteReglementaireComponent,
        // GalleryComponent,
        // DetailCommuniqueComponent,
        // DetailAlbumComponent,
        // MediasComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        AccordionModule.forRoot(),
        BsDropdownModule.forRoot(),
        StickyModule,
        SwiperModule,
        NgPipesModule,
        ChartsModule,
        NotifierModule.withConfig(customNotifierOptions),
        PaginationModule.forRoot(),
        FormsModule,
        ModalModule.forRoot(),
        ShareModule.forRoot(),
        LazyLoadImageModule
        // NgxCaptchaModule.forRoot({
        //     reCaptcha2SiteKey: SITE_KEY, // optional, can be overridden with 'siteKey' component property
        //     invisibleCaptchaSiteKey: SITE_KEY_SECRET // optional, can be overridden with 'siteKey' component property
        // }),
    ],
    exports: [
        AccordionModule,
    ],
    providers: [
        Title,
        DataService,
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        },
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
