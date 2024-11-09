import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from './people.interface';
import { PEOPLE_DATA_REPOSITORY } from './people-data-repository.token';
import { PeopleDataRepository } from './people-data-repository.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(
    @Inject(PEOPLE_DATA_REPOSITORY)
    private peopleDataRepository: PeopleDataRepository
  ) {}

  getAllPeople(): Observable<Person[]> {
    return this.peopleDataRepository.getPeople();
  }

  getPersonDetails(id: string): Observable<Person> {
    return this.peopleDataRepository.getPersonById(id);
  }
}
