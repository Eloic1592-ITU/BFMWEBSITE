import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FaqDisplayItem {
    question: string;
    answers: string[];
    html?: string;
}

@Component({
    selector: 'app-eariary-faq',
    templateUrl: './eariary-faq.component.html',
    styleUrls: ['./eariary-faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EariaryFaqComponent implements OnInit {
    currentLang: 'fr' | 'mg' = 'fr';
    openIndex: number | null = null;
    frenchFaq: FaqDisplayItem[] = [];
    malagasyFaq: FaqDisplayItem[] = [];
    private loaded = false;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        // Charge la FAQ dès l'arrivée sur la section (version FR + MG depuis l'API).
        this.loadFaq();
    }y

    switchLang(lang: 'fr' | 'mg') {
        if (this.currentLang === lang) {
            return;
        }
        this.currentLang = lang;
        this.openIndex = null;
    }

    private loadFaq() {
        const url = 'https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/faq';
        this.http.get<any>(url).subscribe({
            next: (res) => {
                // L'API renvoie { code, message, data: { status, data: [...] } }
                const rootData = res && res.data ? res.data : null;
                const inner = rootData && rootData.data ? rootData.data : rootData;
                const data = inner || [];
                const items = data as any[];
                this.frenchFaq = items.map(item => this.mapApiItem(item, 'fr'));
                this.malagasyFaq = items.map(item => this.mapApiItem(item, 'mg'));
                this.loaded = true;
            },
            error: () => {
                // En cas d'erreur, on laisse le contenu vide (ou on pourra ajouter un fallback plus tard)
                this.loaded = false;
            }
        });
    }

    private mapApiItem(raw: any, lang: 'fr' | 'mg'): FaqDisplayItem {
        const questionKey = lang === 'fr' ? 'QUESTION_FR' : 'QUESTION_MG';
        const answerKey = lang === 'fr' ? 'REPONSE_FR' : 'REPONSE_MG';

        const questionRaw = raw && raw[questionKey] ? String(raw[questionKey]) : '';
        const question = this.normalizeApostrophes(questionRaw).replace(/\s+/g, ' ').trim();

        const rawAnswer = raw && raw[answerKey] ? String(raw[answerKey]) : '';
        const normalizedAnswer = this.normalizeApostrophes(rawAnswer);

        // Cas particulier : la réponse est déjà un bloc HTML (table de comparaison, etc.)
        if (normalizedAnswer.indexOf('<table') !== -1) {
            return {
                question,
                answers: [],
                html: normalizedAnswer
            };
        }

        const rawLines = normalizedAnswer.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

        // Regroupe les lignes qui appartiennent à la même phrase :
        // - on supprime les puces '?' ou '•' en début de ligne
        // - on crée une nouvelle entrée si :
        //      * c'est la première ligne
        //      * OU la phrase précédente se termine déjà par un point.
        //   Sinon, on concatène à la phrase précédente.
        const merged: string[] = [];

        rawLines.forEach(line => {
            const cleaned = line.replace(/^[●•?\u2022]\s*/, '');
            if (!cleaned) {
                return;
            }
            const lastIndex = merged.length - 1;
            if (merged.length === 0) {
                merged.push(cleaned);
                return;
            }
            const prev = merged[lastIndex];
            const prevEndsWithDot = /\.\s*$/.test(prev);
            if (prevEndsWithDot) {
                merged.push(cleaned);
            } else {
                merged[lastIndex] = prev + ' ' + cleaned;
            }
        });

        const answers = merged;
        return {
            question,
            answers
        };
    }

    /** Remplace les ? utilisés à la place des apostrophes dans les textes MG. */
    private normalizeApostrophes(text: string): string {
        if (!text) {
            return '';
        }
        // Remplace les ? entre lettres par une apostrophe
        return text.replace(/([A-Za-zÀ-ÖØ-öø-ÿ])\?([A-Za-zÀ-ÖØ-öø-ÿ])/g, '$1\'$2');
    }

    toggle(index: number) {
        this.openIndex = this.openIndex === index ? null : index;
    }

    isOpen(index: number): boolean {
        return this.openIndex === index;
    }
}
