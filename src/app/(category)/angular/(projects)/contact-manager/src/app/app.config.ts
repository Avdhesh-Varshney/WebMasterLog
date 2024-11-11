import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    // Provide toastr and its configs
    provideToastr({
      maxOpened: 2,
      autoDismiss: true,
      timeOut: 5000,
      closeButton: true,
      extendedTimeOut: 1000,
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      newestOnTop: true,
    }),
  ],
};
