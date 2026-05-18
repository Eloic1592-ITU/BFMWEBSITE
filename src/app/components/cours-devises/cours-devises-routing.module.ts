import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursDevisesComponent} from "./cours-devises.component";

const routes: Routes = [
    {path: ":slug", component: CoursDevisesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursDevisesRoutingModule { }
