import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionSpontanneComponent } from "./inscription-spontanne.component"

const routes: Routes = [
    {path: "", component: InscriptionSpontanneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionSpontanneRoutingModule { }
