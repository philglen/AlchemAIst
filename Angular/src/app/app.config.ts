import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { PEOPLE_DATA_REPOSITORY } from './people/people-data-repository.token';
import { MongoPeopleDataRepository } from './people/mongo-people-data-repository.service';
import { PRODUCTS_DATA_REPOSITORY } from './people/product-page/products-data-repository.token';
import { MongoProductsDataRepository } from './people/product-page/mongo-products-data-repository.service';
import { TokenInterceptor } from './auth/services/token-interceptor.service';
import { HttpAuthService } from './auth/services/http-auth.service';
import { AUTH_SERVICE } from './auth/models/auth-service.interface';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
    },
    {
      provide: AUTH_SERVICE,
      useClass: HttpAuthService,
    },
    {
      provide: PEOPLE_DATA_REPOSITORY,
      useClass: MongoPeopleDataRepository,
    },
    {
      provide: PRODUCTS_DATA_REPOSITORY,
      useClass: MongoProductsDataRepository,
    },
  ],
};
