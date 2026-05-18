import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  imports: [
    CommonModule,
    NotfoundRoutingModule
  ],
  declarations: [NotfoundComponent]
})
export class NotfoundModule { }
