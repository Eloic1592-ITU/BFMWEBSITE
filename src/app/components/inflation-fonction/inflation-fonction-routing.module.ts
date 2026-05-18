import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InflationFonctionComponent} from "./inflation-fonction.component";

const routes: Routes = [
    {
        path : ':slug',
        component : InflationFonctionComponent
    },
    { path: "", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflationFonctionRoutingModule { }
