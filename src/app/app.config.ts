import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTE } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { transformUrlInterceptor } from './core/interceptors/transform-url.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTE),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([jwtInterceptor, transformUrlInterceptor, errorHandlerInterceptor]),
      withFetch()
    ),
  ],
};
