import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-eariary-use-cases',
    templateUrl: './eariary-use-cases.component.html',
    styleUrls: ['./eariary-use-cases.component.scss']
})
export class EariaryUseCasesComponent implements OnInit, AfterViewInit {
    activeTab = 'particuliers';

    switchTab(tab: string) {
        this.activeTab = tab;
        // Re-trigger animations after tab switch
        setTimeout(() => this.initScrollAnimations(), 50);
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.initScrollAnimations();
    }

    private initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        Array.from(document.querySelectorAll('.use-cases-section .fade-in-up')).forEach(el => {
            el.classList.remove('visible');
            observer.observe(el);
        });
    }
}
