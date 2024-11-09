// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginResponse } from '../login/login-response.interface';
import { environment } from '../../../environment';
import { AuthServiceInterface } from '../models/auth-service.interface';
import { LoginCredentials } from '../models/login-credentials.interface';
import { UserRegistration } from '../models/user-registration.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService implements AuthServiceInterface {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: UserRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response) => response), // Transform the response if necessary
      catchError(this.handleError) // Handle errors
    );
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Pass the error message to the caller
  }
}
