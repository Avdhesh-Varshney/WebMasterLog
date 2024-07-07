import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";


export const appConfig: ApplicationConfig
 = {
  providers: [provideRouter(routes), provideClientHydration(),importProvidersFrom(HttpClientModule),provideHttpClient(withFetch())]
};
