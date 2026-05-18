import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EariaryRoutingModule } from './eariary-routing.module';
import { EariaryComponent } from './eariary.component';
import { EariaryHeroComponent } from './hero/eariary-hero.component';
import { EariarySignupComponent } from './signup/eariary-signup.component';
import { EariaryUseCasesComponent } from './use-cases/eariary-use-cases.component';
import { EariaryFaqComponent } from './faq/eariary-faq.component';
import { EariarySideNavComponent } from './side-nav/eariary-side-nav.component';
import { EariaryStatsService } from './eariary-stats.service';

@NgModule({
    providers: [EariaryStatsService],
    imports: [
        CommonModule,
        FormsModule,
        EariaryRoutingModule
    ],
    declarations: [
        EariaryComponent,
        EariaryHeroComponent,
        EariarySignupComponent,
        EariaryUseCasesComponent,
        EariaryFaqComponent,
        EariarySideNavComponent
    ]
})
export class EariaryModule {}
