import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import { environment } from 'src/environments/environment';
import { TranslocoService } from '@jsverse/transloco';
import { Preferences } from '@capacitor/preferences';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'fr', 'de', 'sw', 'pt'],
        defaultLang: 'en', // Initial fallback, overridden by APP_INITIALIZER
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLanguage,
      deps: [TranslocoService],
      multi: true,
    },
  ],
})
export class TranslocoRootModule {}

function initializeLanguage(transloco: TranslocoService) {
  return async () => {
    const lang = await getDefaultLanguage();
    transloco.setActiveLang(lang);
  };
}

async function getDefaultLanguage(): Promise<string> {
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'sw', 'pt'];

  const { value: storedLang } = await Preferences.get({ key: 'lang' });
  if (storedLang && supportedLanguages.includes(storedLang)) {
    return storedLang; 
  }

  const browserLang = navigator.language || navigator.languages[0];
  const langCode = browserLang.split('-')[0]; 
  return supportedLanguages.includes(langCode) ? langCode : 'en';
}