import { Observable } from 'rxjs';

import { Person } from './people.interface';

export interface PeopleDataRepository {
  getPeople(): Observable<Person[]>;
  getPersonById(id: string): Observable<Person>;
}
