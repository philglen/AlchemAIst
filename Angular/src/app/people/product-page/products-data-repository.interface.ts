import { Observable } from 'rxjs';

import { Product } from './product.interface';

export interface ProductsDataRepository {
  getProducts(): Observable<Product[]>;
  getProductsByPersonId(id: string): Observable<Product[]>;
}
