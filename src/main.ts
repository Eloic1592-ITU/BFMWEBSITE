import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.mobile) {
    let htmlBody = document.getElementsByTagName('body')[0];
    htmlBody.classList.add('app-mobile');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
