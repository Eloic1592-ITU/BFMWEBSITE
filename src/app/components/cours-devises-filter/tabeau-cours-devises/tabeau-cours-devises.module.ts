import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabeauCoursDevisesComponent} from "./tabeau-cours-devises.component";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TabeauCoursDevisesComponent],
    exports :[
        TabeauCoursDevisesComponent
    ]

})
export class TabeauCoursDevisesModule { }
