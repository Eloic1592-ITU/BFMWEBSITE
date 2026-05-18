import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TauxReferenceComponent } from './components/taux-reference/taux-reference/taux-reference.component';
import { FaqComponent } from './components/faq/faq.component';
import {ListeActualitesModule} from "./components/liste-actualites/liste-actualites.module";
import {TextesReglementairesModule} from "./components/textes-reglementaires/textes-reglementaires.module";
import {HomeModule} from "./components/home/home.module";
import {InscriptionSpontanneComponent} from "./components/inscription-spontanne/inscription-spontanne.component";
// import { PageComponent } from './components/page/page.component';
// import { ContactFormComponent } from './components/contact-form/contact-form.component';
// import { ListeOffresComponent } from "./components/liste-offres/liste-offres.component";
// import { ListeActualitesComponent } from "./components/liste-actualites/liste-actualites.component";
// import { DetailActualiteComponent } from './components/detail-actualite/detail-actualite.component';
// import { TextesReglementairesComponent } from './components/textes-reglementaires/textes-reglementaires.component';
// import { CommuniquesComponent } from './components/communiques/communiques.component';
// import { DetailTexteReglementaireComponent } from './components/detail-texte-reglementaire/detail-texte-reglementaire.component';
// import { DetailCommuniqueComponent } from './components/detail-communique/detail-communique.component';
/*import { AboutComponent } from './about/about.component';*/

// import { DetailAlbumComponent } from './components/detail-album/detail-album.component';
// import { MediasComponent } from './components/medias/medias.component';

const routes: Routes = [
    {
        path: '',
        // component: HomeComponent
        loadChildren: './components/home/home.module#HomeModule'
    },{
        path: 'faq',
        loadChildren: './components/faq/faq.module#FaqModule'
    },
    {
        path: 'contact',
        loadChildren: './components/contact-form/contact-form.module#ContactFormModule'
    }
    ,
    {
        path: 'candidature-spontanee',
        loadChildren: './components/inscription-spontanne/inscription-spontanne.module#InscriptionSpontanneModule'
    }
    ,
    {
        path: 'offre',
        loadChildren: './components/liste-offres/liste-offres.module#ListeOffresModule'
    },
    /* route to actualité*/
    {
        path: 'actualite',
        loadChildren: './components/liste-actualites/liste-actualites.module#ListeActualitesModule'
    },
    /* route to texte reglementaires**/
    {
      path: 'texte-reglementaire',
        loadChildren: './components/textes-reglementaires/textes-reglementaires.module#TextesReglementairesModule'
    },
    /* route to communique*/
    {
      path: 'communique',
        loadChildren: './components/communiques/communiques.module#CommuniquesModule'
    },
    {
        path: 'recherche',
        loadChildren: './components/search/search.module#SearchModule'
    },
    {
        path: 'bulletin',
        loadChildren: './components/bulletin/bulletin.module#BulletinModule'
    },
    // {
    //     path: 'devise',
    //     loadChildren: './components/cours-devises/cours-devises.module#CoursDevisesModule'
    // },
    // {
    //     path: 'devisemid',
    //     loadChildren: './components/cours-devises-avant-mid/cours-devises-avant-mid.module#CoursDevisesAvantMidModule'
    // },
    // {
    //     path: 'devisemens',
    //     loadChildren: './components/cours-devises-mensuelle/cours-devises-mensuelle.module#CoursDevisesMensuelleModule'
    // },
    {
        path: 'pdf',
        loadChildren: './components/document-filter/document-filter.module#DocumentFilterModule'
    },
    {
        path: 'inflation-origine-produit',
        loadChildren: './components/inflation-origine-produit/inflation-origine-produit.module#InflationOrigineProduitModule'
    },
    {
        path: 'inflation-secteur-production',
        loadChildren: './components/inflation-secteur-production/inflation-secteur-production.module#InflationSecteurProductionModule'
    },
    {
        path: 'inflation-fonction',
        loadChildren: './components/inflation-fonction/inflation-fonction.module#InflationFonctionModule'
    },
    {
        path: 'evolution-taux-directeur',
        loadChildren: './components/evolution-taux-directeur/evolution-taux-directeur.module#EvolutionTauxDirecteurModule'
    },
    {
        path: 'indicateur',
        loadChildren: './components/marcher-de-change/marcher-de-change.module#MarcherDeChangeModule'
    },
    {
        path: 'taux-reference',
        component: TauxReferenceComponent
    },
    /*{
      path: 'communique/page',
      redirectTo : 'communique/page/1',
      pathMatch: 'full'
    },
    {
      path: 'communique/page/:id',
      component: CommuniquesComponent
    },*/
    /* route to album */
    {
        path: 'espace-echange',
        loadChildren: './components/echange/echange.module#EchangeModule'
    },
    /* route to album */
    {
        path: 'galerie',
        loadChildren: './components/medias/medias.module#MediasModule'
    },
    // {
    //     path: 'media/:id',
    //     component: DetailAlbumComponent
    // },
    {path: '404', loadChildren: './components/notfound/notfound.module#NotfoundModule'},
    {
        path: 'eariary',
        loadChildren: './components/eariary/eariary.module#EariaryModule'
    },
    {
        path: ':pageID',
        loadChildren: './components/page/page.module#PageModule'
    },
    {
        path: '**',
        redirectTo: '/404'
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
