import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PeopleService } from './people.service';

import { Person } from './people.interface';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getAllPeople();
  }
}
