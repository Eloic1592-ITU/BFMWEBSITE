import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MarcherDeChangeComponent} from "./marcher-de-change.component";

const routes: Routes = [
    { path: ":slug", component: MarcherDeChangeComponent },
    { path: "", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcherDeChangeRoutingModule { }
