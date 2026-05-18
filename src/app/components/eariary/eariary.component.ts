import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EariaryStatsService } from './eariary-stats.service';

@Component({
    selector: 'app-eariary',
    templateUrl: './eariary.component.html',
    styleUrls: ['./eariary.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EariaryComponent implements OnInit {
    constructor(private eariaryStats: EariaryStatsService) {}

    ngOnInit() {
        this.eariaryStats.trackPageView();
    }
}
