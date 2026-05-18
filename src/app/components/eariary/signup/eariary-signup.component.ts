import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var $: any;

const API_INSCRIPTION = 'https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/inscription';
const API_ALREADY_EXIST = 'https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/already_exist';
const API_REGION = 'https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/region';

/** Mapping type de compte formulaire → cpte_id API */
const CPTE_ID_MAP: { [key: string]: number } = {
    particulier: 1,
    marchand: 2,
    epicerie: 3,
    grande_entreprise: 4
};

/** Textes FR/MG centralisés (formulaire signup eAriary) */
const TEXTS: { [key: string]: { fr: string; mg: string } } = {
    title: { fr: 'Ouvrir un compte <span class=\'signup-highlight\'>eAriary</span>', mg: 'Hanokatra kaonty <span class=\'signup-highlight\'>eAriary</span>' },
    subtitle: { fr: 'Rejoignez-nous en quelques minutes', mg: 'Miaraha aminay ao anatin\'ny minitra vitsy' },
    account_access_info: {
        fr: 'Que vous ayez déjà un compte dans une institution partenaire ou non, vous pouvez toujours ouvrir un compte eAriary en quelques minutes.',
        mg: 'Na efa manana kaonty ao amin\'ny mpiara-miombona antoka ianao na tsia, dia afaka manokatra kaonty eAriary foana ao anatin\'ny minitra vitsy.'
    },
    label_nom: { fr: 'Nom', mg: 'Anarana' },
    label_prenom: { fr: 'Prénom', mg: 'Fanampin\'anarana' },
    label_dob: { fr: 'Date de naissance', mg: 'Daty nahaterahana' },
    label_region: { fr: 'Région', mg: 'Faritra' },
    label_lieu: { fr: 'Lieu de résidence', mg: 'Toerana ipetrahana' },
    label_email: { fr: 'Email', mg: 'Adiresy mailaka' },
    label_telephone: { fr: 'Numéro de téléphone', mg: 'Laharana telefaona' },
    label_type: { fr: 'Type de compte', mg: 'Karazana kaonty' },
    placeholder_nom: { fr: 'Ex : Rakoto', mg: 'Ohatra: Rakoto' },
    placeholder_prenom: { fr: 'Ex : Jean', mg: 'Ohatra: Jean' },
    placeholder_region: { fr: 'Sélectionnez une région', mg: 'Misafidiana faritra' },
    placeholder_lieu: { fr: 'Ex : Morondava, Maevatanana, Ambatondrazaka', mg: 'Ohatra: Morondava, Maevatanana, Ambatondrazaka' },
    placeholder_email: { fr: 'Ex : jean.rakoto@email.com', mg: 'Ohatra: jean.rakoto@email.com' },
    placeholder_telephone: { fr: 'Ex : +261 34 12 345 67', mg: 'Ohatra: +261 34 12 345 67' },
    type_particulier: { fr: 'Particulier', mg: 'Olon-tsotra' },
    type_particulier_desc: { fr: 'Compte personnel pour vos transferts du quotidien', mg: 'Kaonty manokana ho an\'ny famindram-bola andavanandro' },
    type_marchand: { fr: 'Marchand', mg: 'Mpivarotra' },
    type_marchand_desc: { fr: 'Acceptez les paiements dans votre commerce', mg: 'Raiso ny fandoavam-bola ao amin\'ny fivarotanao' },
    type_epicerie: { fr: 'Épicerie', mg: 'Fivarotana enta-madinika' },
    type_epicerie_desc: { fr: 'Acceptez les paiements dans votre commerce', mg: 'Raiso ny fandoavam-bola ao amin\'ny fivarotanao' },
    type_grande_entreprise: { fr: 'Grande entreprise', mg: 'Orinasa lehibe' },
    type_grande_entreprise_desc: { fr: 'Solutions B2B pour votre organisation', mg: 'Vahaolana B2B ho an\'ny fikambananao' },
    btn_sending: { fr: 'Envoi en cours...', mg: 'Alefa...' },
    btn_submit: { fr: 'Faire partie du pilote', mg: 'Handray anjara amin\'ny andrana' },
    popup_success_title: { fr: 'Demande reçue !', mg: 'Voaray ny fangatahana !' },
    popup_success_body: {
        fr: 'Votre demande d\'ouverture de compte eAriary a bien été reçue. Vous allez recevoir les détails prochainement. Nous vous remercions pour votre intérêt pour eAriary.',
        mg: 'Voaray ny fangatahana fanokafana kaonty eAriary. Omena anao tsy ho ela ny momban\'ny kaontinao. Misaotra anao amin\'ny fanohanana ny eAriary.'
    },
    popup_close: { fr: 'Fermer', mg: 'Hidio' },
    popup_error_title: { fr: 'Erreur', mg: 'Hadisoana' }
};

@Component({
    selector: 'app-eariary-signup',
    templateUrl: './eariary-signup.component.html',
    styleUrls: ['./eariary-signup.component.scss']
})
export class EariarySignupComponent implements OnInit, OnDestroy {
    currentLang = 'fr';
    showSuccessPopup = false;
    showErrorPopup = false;
    submitInProgress = false;
    errorMessage = '';
    regions: Array<{ id: string; name: string }> = [];

    formData = {
        nom: '',
        prenom: '',
        dob: '',
        region: '',
        lieu: '',
        email: '',
        telephone: '',
        type: ''
    };

    formErrors: { [key: string]: string } = {};

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadRegions();
    }

    ngOnDestroy() {
        this.destroyRegionSelect();
    }

    switchLang(lang: string) {
        this.currentLang = lang;
        setTimeout(() => this.initRegionSelect2(), 0);
    }

    /** Retourne le texte selon la clé et la langue (textes définis dans TEXTS). */
    getText(key: string): string {
        const t = TEXTS[key];
        return t ? (this.currentLang === 'fr' ? t.fr : t.mg) : '';
    }

    getPlaceholder(fieldKey: string): string {
        return this.getText('placeholder_' + fieldKey);
    }

    private loadRegions() {
        this.http.get<any>(API_REGION).subscribe({
            next: (res) => {
                const data = res && res.data && res.data.data ? res.data.data : [];
                this.regions = (data as any[]).map(item => ({
                    id: String(item.REGION_ID),
                    name: String(item.REGION_NAME)
                }));
                setTimeout(() => this.initRegionSelect2(), 0);
            },
            error: () => {
                this.regions = [];
            }
        });
    }

    private initRegionSelect2() {
        if (typeof $ === 'undefined') {
            return;
        }

        this.destroyRegionSelect();

        var placeholder = this.getPlaceholder('region');
        var self = this;
        $('#region').select2({
            width: '100%',
            placeholder: placeholder,
            allowClear: false,
            minimumResultsForSearch: 1,
            language: {
                noResults: function() {
                    return self.currentLang === 'fr'
                        ? 'Aucun résultat trouvé'
                        : 'Tsy misy valiny hita';
                }
            },
            escapeMarkup: function(markup) {
                return markup;
            }
        });

        $('#region').val(this.formData.region).trigger('change.select2');
        $('#region').on('change.eariary', function() {
            self.formData.region = $(this).val() || '';
        });
    }

    private destroyRegionSelect() {
        if (typeof $ === 'undefined') {
            return;
        }

        var regionEl = $('#region');
        if (regionEl && regionEl.data('select2')) {
            regionEl.off('change.eariary');
            regionEl.select2('destroy');
        }
    }

    /** Numéro valide : préfixe 032/033/034/037/038 et exactement 10 chiffres (ex. 0344963894). */
    validatePhone(phone: string): boolean {
        if (!phone) return true;
        const cleaned = phone.replace(/\s+/g, '').replace('+261', '0').replace(/\D/g, '');
        if (cleaned.length !== 10) return false;
        const validPrefixes = ['032', '037', '034', '038', '033'];
        return validPrefixes.some(p => cleaned.startsWith(p));
    }

    /** Email valide : format standard avec TLD en lettres (ex. user@domain.com). */
    validateEmail(email: string): boolean {
        if (!email) return true;
        const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return re.test(email.trim());
    }

    formatPhone(phone: string): string {
        if (!phone) return '';
        let cleaned = phone.replace(/\s+/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '+261' + cleaned.substring(1);
        }
        return cleaned;
    }

    /** Retourne le numéro de téléphone au format attendu par l'API (chiffres uniquement, ex. 261343403434) */
    getPhoneForApi(): string {
        if (!this.formData.telephone) return '';
        const formatted = this.formatPhone(this.formData.telephone);
        return formatted.replace(/\D/g, '');
    }

    /** Calcule l'âge en années révolues à partir d'une date de naissance AAAA-MM-JJ. */
    private getAgeFromDob(dob: string): number {
        if (!dob) {
            return NaN;
        }
        const birth = new Date(dob);
        if (isNaN(birth.getTime())) {
            return NaN;
        }
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    getCpteId(): number {
        const type = this.formData.type || 'particulier';
        return CPTE_ID_MAP[type] !== undefined ? CPTE_ID_MAP[type] : 1;
    }

    onSubmit() {
        this.formErrors = {};

        // Check required fields
        const requiredFields = ['nom', 'prenom', 'dob', 'region', 'lieu', 'type'];
        const requiredMsg = this.currentLang === 'fr' ? 'Champ obligatoire' : 'Mila fenoina';

        for (const field of requiredFields) {
            if (!this.formData[field]) {
                this.formErrors[field] = requiredMsg;
            }
        }

        // Age must be between 15 and 100 years
        if (this.formData.dob) {
            const age = this.getAgeFromDob(this.formData.dob);
            if (isNaN(age) || age <= 15 || age >= 100) {
                this.formErrors['dob'] = this.currentLang === 'fr'
                    ? 'votre âge invalide'
                    : 'tsy mety ny taonanao';
            }
        }

        // At least email or telephone
        if (!this.formData.email && !this.formData.telephone) {
            const msg = this.currentLang === 'fr'
                ? 'Il faut au moins renseigner soit votre adresse email soit votre numéro téléphone.'
                : 'Tsy maintsy mila mampiditra iray amin\'ireto ianao : na adiresy mailaka na laharana telefaonina.';
            this.formErrors['email'] = msg;
            this.formErrors['telephone'] = msg;
        }

        // Validate email format (strict : TLD en lettres, ex. user@domain.com)
        if (this.formData.email && !this.validateEmail(this.formData.email)) {
            this.formErrors['email'] = this.currentLang === 'fr'
                ? 'Format email invalide'
                : 'Tsy mety ny endri-mailaka';
        }

        // Validate phone (exactement 10 chiffres, préfixes 032/033/034/037/038)
        if (this.formData.telephone && !this.validatePhone(this.formData.telephone)) {
            this.formErrors['telephone'] = this.currentLang === 'fr'
                ? 'Numéro invalide. Opérateurs autorisés : 032, 033, 034, 037, 038 (10 chiffres max).'
                : 'Laharana tsy mety. Teleôperateôra azo ekena : 032, 033, 034, 037, 038 (chiffres 10 fotsiny).';
        }

        if (Object.keys(this.formErrors).length > 0) {
            const emailOrPhoneError = this.formErrors['email'] || this.formErrors['telephone'];
            if (emailOrPhoneError) {
                this.errorMessage = this.currentLang === 'fr'
                    ? 'Email ou numéro incorrect. Veuillez réessayer s\'il vous plaît.'
                    : 'Mailaka na laharana tsy mety. Andramo indray azafady.';
                this.showErrorPopup = true;
            }
            return;
        }

        this.showErrorPopup = false;
        const emailForCheck = (this.formData.email || '').trim();
        const phoneForCheck = this.getPhoneForApi();

        const checkParams = new HttpParams()
            .set('email', emailForCheck)
            .set('phone', phoneForCheck);

        this.http.get(API_ALREADY_EXIST, { params: checkParams }).subscribe({
            next: (res: any) => {
                // L'API renvoie { code, message, data: { status: 200, already_exist: true } }
                const data = res && res.data ? res.data : res;
                const alreadyExists = data && (
                    data.already_exist === true ||
                    data.already_exists === true ||
                    data.exists === true
                );
                if (alreadyExists) {
                    this.errorMessage = this.currentLang === 'fr'
                        ? 'Cet email ou ce numéro est déjà enregistré. Veuillez utiliser d\'autres coordonnées.'
                        : 'Efa misy io mailaka na io laharana io. Mampiasà mailaka na laharana hafa azafady.';
                    this.showErrorPopup = true;
                    return;
                }
                this.doInscription();
            },
            error: () => {
                this.doInscription();
            }
        });
    }

    private doInscription() {
        this.submitInProgress = true;

        const phoneForApi = this.getPhoneForApi();
        const params = new HttpParams()
            .set('name', this.formData.nom.trim())
            .set('firstname', this.formData.prenom.trim())
            .set('birthday', this.formData.dob)
            .set('region', this.formData.region)
            .set('address', this.formData.lieu.trim())
            .set('email', (this.formData.email || '').trim())
            .set('phone', phoneForApi)
            .set('cpte_id', String(this.getCpteId()));

        this.http.post(API_INSCRIPTION, {}, { params }).subscribe({
            next: () => {
                this.submitInProgress = false;
                this.showSuccessPopup = true;
                this.formData = { nom: '', prenom: '', dob: '', region: '', lieu: '', email: '', telephone: '', type: '' };
            },
            error: (err) => {
                this.submitInProgress = false;
                this.errorMessage = this.currentLang === 'fr'
                    ? 'Une erreur est survenue. Veuillez réessayer plus tard.'
                    : 'Nisy hadisoana nitranga. Andramo indray any aoriana.';
                if (err.error && typeof err.error === 'object' && err.error.message) {
                    this.errorMessage = err.error.message;
                } else if (err.message) {
                    this.errorMessage = err.message;
                }
                this.showErrorPopup = true;
            }
        });
    }

    closePopup() {
        this.showSuccessPopup = false;
        this.formData = { nom: '', prenom: '', dob: '', region: '', lieu: '', email: '', telephone: '', type: '' };
    }

    closeErrorPopup() {
        this.showErrorPopup = false;
        this.errorMessage = '';
    }
}
