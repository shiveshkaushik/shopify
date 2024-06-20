import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { tokenAuthInterceptor } from './token-auth.interceptor';
import { HeadersInterceptor } from "./headers.interceptor"

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideToastr(), provideAnimations(),
  //provideHttpClient(withFetch(), withInterceptors([tokenAuthInterceptor]))
  ]
};
