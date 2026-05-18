import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursDevisesFilterComponent } from "./cours-devises-filter.component";

const routes: Routes = [
    { path: "", component: CoursDevisesFilterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursDevisesFilterRoutingModule { }
