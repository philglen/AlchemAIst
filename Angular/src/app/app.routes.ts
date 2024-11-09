import { Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { PeopleComponent } from './people/people.component';
import { ProductPageComponent } from './people/product-page/product-page.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegistrationComponent } from './auth/registration/registration.component';

export const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'people/:personId/products',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/logon' },
];
