import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './product.interface';
import { ProductsDataRepository } from './products-data-repository.interface';
import { PRODUCTS_DATA_REPOSITORY } from './products-data-repository.token';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_DATA_REPOSITORY)
    private productDataRepository: ProductsDataRepository
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.productDataRepository.getProducts();
  }

  getPersonProducts(id: string): Observable<Product[]> {
    return this.productDataRepository.getProductsByPersonId(id);
  }
}
