import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { ApiErrorInterceptor } from './core/services/core/interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideAnimationsAsync(),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),

    MessageService,

    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true,
    },
  ],
};
