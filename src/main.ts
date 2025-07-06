import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';

registerLicense(environment.syncfusionKey);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
