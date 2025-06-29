import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
     ...appConfig,
    provideHttpClient(),
    provideRouter(routes)
  ]
});
