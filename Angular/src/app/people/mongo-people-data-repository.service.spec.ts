import { TestBed } from '@angular/core/testing';

import { MongoPeopleDataRepositoryService } from './mongo-people-data-repository.service';

describe('MongoPeopleDataRepositoryService', () => {
  let service: MongoPeopleDataRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoPeopleDataRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
