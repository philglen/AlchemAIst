import { InjectionToken } from '@angular/core';
import { PeopleDataRepository } from './people-data-repository.interface';

export const PEOPLE_DATA_REPOSITORY = new InjectionToken<PeopleDataRepository>(
  'PeopleDataRepository'
);
