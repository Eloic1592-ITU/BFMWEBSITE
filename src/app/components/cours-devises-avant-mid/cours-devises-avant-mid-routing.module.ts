import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursDevisesAvantMidComponent } from "./cours-devises-avant-mid.component";

const routes: Routes = [
    {path: ":slug", component: CoursDevisesAvantMidComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursDevisesAvantMidRoutingModule { }
