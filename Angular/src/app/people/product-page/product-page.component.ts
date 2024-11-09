import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Person } from '../people.interface';
import { Product } from './product.interface';

import { PeopleService } from '../people.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  personId: string | null = null;
  person!: Person;
  products$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private peopleService: PeopleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.person = history.state.person;

    if (this.person) {
      this.products$ = this.productsService.getPersonProducts(this.person._id!);
    } else {
      // Fallback if no state is available (e.g., direct URL access)
      this.personId = this.route.snapshot.paramMap.get('personId');
      this.peopleService
        .getPersonDetails(this.personId!)
        .subscribe((person) => (this.person = person));
    }
  }

  goBack() {
    this.location.back();
  }
}
