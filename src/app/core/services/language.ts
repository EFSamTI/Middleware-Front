import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })
export class LanguageService {
    public languages: string[] = ['sp', 'en'];

    constructor(
        public translate: TranslateService,
        private cookieService: CookieService
    ) {
        let browserLang: any;
        this.translate.addLangs(this.languages);
        if (this.cookieService.check('lang')) {
            browserLang = this.cookieService.get('lang');
        } else {
            browserLang = translate.getBrowserLang();
        }
        translate.use(browserLang.match(/en|sp/) ? browserLang : 'sp');
    }

    get list() {
        return [
            { text: 'Español', flag: 'assets/images/flags/ec.svg', lang: 'sp' },
            { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
            // { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'gr' },
            // { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
            // { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
            // { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
            // { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
            // { text: 'Arabic', flag: 'assets/images/flags/ae.svg', lang: 'ar' },
        ];
    }

    get current() {
        let browserLang = this.cookieService.get('lang');
        let val = this.list.filter(x => x.lang === browserLang);
        if (val.length === 0) {
            return { text: 'Español', flag: 'assets/images/flags/ec.svg', lang: 'sp' };
        } else return val[0];
    }

    public setLanguage(lang: any) {
        this.translate.use(lang);
        this.cookieService.set('lang', lang);
        return this.list.filter(x => x.lang === lang)[0];
    }
}