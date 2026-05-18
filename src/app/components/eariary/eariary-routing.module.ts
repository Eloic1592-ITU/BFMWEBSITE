import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EariaryComponent } from './eariary.component';

const routes: Routes = [
    { path: '', component: EariaryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EariaryRoutingModule {}
