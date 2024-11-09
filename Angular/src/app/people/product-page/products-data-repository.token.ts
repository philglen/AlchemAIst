import { InjectionToken } from '@angular/core';
import { ProductsDataRepository } from './products-data-repository.interface';

export const PRODUCTS_DATA_REPOSITORY =
  new InjectionToken<ProductsDataRepository>('ProductsDataRepository');
