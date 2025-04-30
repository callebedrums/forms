import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FORMS_API, FORMS_SERVICE_TYPE, FormsServiceType } from './env.config';
import { FormsServiceToken } from './forms/forms-service.class';
import { FormsApiService } from './forms/forms-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    /// this value should come from an external config file, or a configuration endpoint
    { provide: FORMS_API, useValue: "/api/forms" },
    { provide: FORMS_SERVICE_TYPE, useValue: FormsServiceType.api },
    { provide: FormsServiceToken, useClass: FormsApiService }// use FormsApiService if FORMS_SERVICE_TYPE equal to 'api', otherwise use FormsMemoryService
  ]
};
