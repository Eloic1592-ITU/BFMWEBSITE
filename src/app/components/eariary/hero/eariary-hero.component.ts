import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-eariary-hero',
    templateUrl: './eariary-hero.component.html',
    styleUrls: ['./eariary-hero.component.scss']
})
export class EariaryHeroComponent implements OnInit, OnDestroy {
    private titleInterval: any;
    isFrench = true;

    frenchTitle = 'Le service <span class="hero-highlight">le moins cher</span>, et <span class="hero-secure">le plus sécurisé</span>';
    malagasyTitle = 'Tolotra <span class="hero-highlight">mora indrindra</span>, ary <span class="hero-secure">azo antoka</span>';

    currentTitle: string;

    ngOnInit() {
        this.currentTitle = this.frenchTitle;

        this.titleInterval = setInterval(() => {
            this.isFrench = !this.isFrench;
            this.currentTitle = this.isFrench ? this.frenchTitle : this.malagasyTitle;
        }, 5000);
    }

    ngOnDestroy() {
        if (this.titleInterval) {
            clearInterval(this.titleInterval);
        }
    }

    scrollTo(event: Event, targetId: string) {
        event.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
}
