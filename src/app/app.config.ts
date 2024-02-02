import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTE } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { transformUrlInterceptor } from './core/interceptors/transform-url.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as userEffects from './core/states/users/user.effects';
import * as userReducers from './core/states/users/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { hydrationMetaReducer } from './core/states/hydration.reducer';
export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTE),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([jwtInterceptor, transformUrlInterceptor, errorHandlerInterceptor]),
      withFetch()
    ),
    provideStore({
      user: userReducers.userReducer,
    },{metaReducers}),
    provideEffects(userEffects.UserEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
};
