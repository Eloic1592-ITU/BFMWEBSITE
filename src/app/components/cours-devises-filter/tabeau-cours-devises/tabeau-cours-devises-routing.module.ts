import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabeauCoursDevisesComponent } from "./tabeau-cours-devises.component";

const routes: Routes = [
    {path:'', component : TabeauCoursDevisesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabeauCoursDevisesRoutingModule { }
