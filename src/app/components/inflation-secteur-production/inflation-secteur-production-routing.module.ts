import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InflationSecteurProductionComponent} from "./inflation-secteur-production.component";

const routes: Routes = [
    {
        path : ':slug',
        component : InflationSecteurProductionComponent
    },
    { path: "", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflationSecteurProductionRoutingModule { }
