import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_STATS = 'https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/stats';
const STORAGE_KEY_PAGE_PREFIX = 'eariary_stats_page_';
const STORAGE_KEY_SECTION_PREFIX = 'eariary_stats_section_';
const STORAGE_KEY_SESSION_ID = 'eariary_stats_session_id';

/**
 * Statistiques de consultation eAriary vers backend dédié.
 * Déduplication côté front :
 * - rubrique : une fois par navigateur et par jour
 * - section : une fois par section, par navigateur et par jour
 */
@Injectable()
export class EariaryStatsService {
    constructor(private http: HttpClient) {}

    trackPageView(): void {
        var key = STORAGE_KEY_PAGE_PREFIX + this.getTodayKey();
        if (this.hasTracked(key)) {
            return;
        }
        this.sendStat('eariary').subscribe({
            next: () => this.markTracked(key),
            error: () => {}
        });
    }

    trackSectionView(sectionId: string): void {
        if (!sectionId) {
            return;
        }
        var key = STORAGE_KEY_SECTION_PREFIX + this.getTodayKey() + '_' + sectionId;
        if (this.hasTracked(key)) {
            return;
        }
        this.sendStat('eariary', sectionId).subscribe({
            next: () => this.markTracked(key),
            error: () => {}
        });
    }

    private sendStat(eventName: string, sectionId?: string) {
        var params = new HttpParams()
            .set('event', eventName)
            .set('session_id', this.getSessionId());
        if (sectionId) {
            params = params.set('section', sectionId);
        }
        return this.http.post(API_STATS, {}, { params: params });
    }

    private getTodayKey(): string {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }

    private hasTracked(key: string): boolean {
        try {
            return typeof localStorage !== 'undefined' && !!localStorage.getItem(key);
        } catch (e) {
            return false;
        }
    }

    private markTracked(key: string): void {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, '1');
            }
        } catch (e) {}
    }

    /**
     * Session ID persistant côté navigateur.
     * Il est partagé entre onglets du même navigateur grâce à localStorage
     * puis envoyé au backend pour stockage en base.
     */
    private getSessionId(): string {
        try {
            if (typeof localStorage === 'undefined') {
                return this.generateSessionId();
            }

            var existing = localStorage.getItem(STORAGE_KEY_SESSION_ID);
            if (existing) {
                return existing;
            }

            var created = this.generateSessionId();
            localStorage.setItem(STORAGE_KEY_SESSION_ID, created);
            return created;
        } catch (e) {
            return this.generateSessionId();
        }
    }

    private generateSessionId(): string {
        var now = new Date().getTime();
        var random = Math.random().toString(36).substr(2, 10);
        return 'eariary_' + now + '_' + random;
    }
}
