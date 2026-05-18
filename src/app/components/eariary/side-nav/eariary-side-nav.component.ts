import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { EariaryStatsService } from '../eariary-stats.service';

@Component({
    selector: 'app-eariary-side-nav',
    templateUrl: './eariary-side-nav.component.html',
    styleUrls: ['./eariary-side-nav.component.scss']
})
export class EariarySideNavComponent implements OnInit, OnDestroy {
    sections = [
        { id: 'accueil', label: 'Accueil' },
        { id: 'inscription', label: 'Inscription' },
        { id: 'use-cases', label: 'Cas d\'usage' },
        { id: 'faq', label: 'FAQ' }
    ];

    activeIndex = 0;

    constructor(private eariaryStats: EariaryStatsService) {}

    ngOnInit() {
        this.updateActiveSection();
    }

    ngOnDestroy() {}

    @HostListener('window:scroll', [])
    onScroll() {
        this.updateActiveSection();
    }

    private updateActiveSection() {
        const scrollPos = window.scrollY;
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(this.sections[i].id);
            if (el && scrollPos >= el.offsetTop - 260) {
                this.activeIndex = i;
                this.eariaryStats.trackSectionView(this.sections[i].id);
                break;
            }
        }
    }

    scrollTo(event: Event, targetId: string) {
        event.preventDefault();
        this.eariaryStats.trackSectionView(targetId);
        const el = document.getElementById(targetId);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
}
