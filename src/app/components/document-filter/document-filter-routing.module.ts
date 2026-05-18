import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocumentFilterComponent} from "./document-filter.component";

const routes: Routes = [
    {path: ":slug", component: DocumentFilterComponent},
    { path: "", redirectTo: "/404" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentFilterRoutingModule {
}
