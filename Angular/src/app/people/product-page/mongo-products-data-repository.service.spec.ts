import { TestBed } from '@angular/core/testing';

import { MongoProductsDataRepository } from './mongo-products-data-repository.service';

describe('ProductPageDataRepositoryService', () => {
  let service: MongoProductsDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoProductsDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
