import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EvolutionTauxDirecteurComponent} from "./evolution-taux-directeur.component";

const routes: Routes = [
    {
        path : ':slug',
        component : EvolutionTauxDirecteurComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvolutionTauxDirecteurRoutingModule { }
