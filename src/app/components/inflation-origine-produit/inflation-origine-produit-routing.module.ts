import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InflationOrigineProduitComponent} from "./inflation-origine-produit.component";

const routes: Routes = [
    {
        path : ':slug',
        component : InflationOrigineProduitComponent
    },
    { path: "", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflationOrigineProduitRoutingModule { }
