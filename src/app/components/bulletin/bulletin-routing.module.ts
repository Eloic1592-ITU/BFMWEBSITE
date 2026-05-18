import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BulletinComponent} from "./bulletin.component";

const routes: Routes = [
    {
        path : ':slug',
        component : BulletinComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulletinRoutingModule { }
