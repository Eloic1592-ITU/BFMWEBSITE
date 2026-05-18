import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursDevisesMensuelleComponent} from "./cours-devises-mensuelle.component";

const routes: Routes = [
    {path:":slug", component: CoursDevisesMensuelleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursDevisesMensuelleRoutingModule { }
