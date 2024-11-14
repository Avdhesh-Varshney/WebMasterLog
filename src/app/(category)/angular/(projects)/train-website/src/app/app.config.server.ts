import {
  mergeApplicationConfig,
  ApplicationConfig,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
