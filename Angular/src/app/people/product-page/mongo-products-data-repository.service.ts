import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class MongoProductsDataRepository {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductsByPersonId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${id}`);
  }
}
