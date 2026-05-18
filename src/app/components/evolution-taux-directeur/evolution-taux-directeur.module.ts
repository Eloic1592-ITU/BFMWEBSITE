import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvolutionTauxDirecteurRoutingModule } from './evolution-taux-directeur-routing.module';
import {EvolutionTauxDirecteurComponent} from "./evolution-taux-directeur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    EvolutionTauxDirecteurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EvolutionTauxDirecteurComponent]
})
export class EvolutionTauxDirecteurModule { }
