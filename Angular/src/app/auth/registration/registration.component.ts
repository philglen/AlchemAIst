import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from '../models/auth-service.interface';
import { UserRegistration } from '../models/user-registration.interface';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface
  ) {
    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['User'],
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const { firstname, lastname, email, password, role } =
        this.registrationForm.value;
      const username = firstname.toLowerCase() + lastname.toLowerCase();

      const user: UserRegistration = {
        username,
        firstname,
        lastname,
        email,
        password,
        role,
      };

      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Registration successful: ', response);
          this.router.navigate(['/login']);
        },
        error: () => alert('Registration failed'),
      });
    } else {
      console.log('Oops, inavlid Form!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
