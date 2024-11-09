import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

import { PeopleDataRepository } from './people-data-repository.interface';

import { Person } from './people.interface';

@Injectable({
  providedIn: 'root',
})
export class MongoPeopleDataRepository implements PeopleDataRepository {
  private baseUrl = `${environment.apiUrl}/people`;

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  getPersonById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/${id}`);
  }
}
