import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PeopleService } from './people.service';
import { Person } from './people.interface';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService, provideHttpClientTesting()],
    });
    service = TestBed.inject(PeopleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched requests are left
  });

  it('should fetch people list', () => {
    const mockPeople: Person[] = [
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        dob: new Date(),
        email: 'johndoe@gmail.com',
        tel: '07123456789',
      },
      {
        id: '2',
        firstname: 'Jane',
        lastname: 'Smith',
        dob: new Date(),
        email: 'janesmith@icloud.com',
        tel: '07123456780',
      },
    ];

    service.getAllPeople().subscribe((people) => {
      expect(people.length).toBe(2);
      expect(people).toEqual(mockPeople);
    });

    const req = httpMock.expectOne('/api/people');
    expect(req.request.method).toBe('GET');
    req.flush(mockPeople); // Provide the mock data to complete the request
  });
});
