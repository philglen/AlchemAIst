import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HttpAuthService } from './auth/services/http-auth.service';

import { PeopleComponent } from './people/people.component';
import { ProductPageComponent } from './people/product-page/product-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PeopleComponent, ProductPageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'The AlchemAIst';

  constructor(public authService: HttpAuthService) {}

  logout() {
    this.authService.logout();
  }
}
