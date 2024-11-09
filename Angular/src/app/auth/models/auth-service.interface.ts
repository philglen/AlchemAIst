import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { LoginCredentials } from './login-credentials.interface';
import { UserRegistration } from './user-registration.interface';

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>(
  'AuthServiceInterface'
);

export interface AuthServiceInterface {
  register(user: UserRegistration): Observable<any>;
  login(credentials: LoginCredentials): Observable<any>;
  forgotPassword(email: string): Observable<any>;
}
