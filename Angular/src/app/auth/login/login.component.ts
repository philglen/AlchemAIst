import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpAuthService } from '../services/http-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: HttpAuthService, private router: Router) {}

  login(): void {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/people']),
        error: () => alert('Login failed'),
      });
  }
}
