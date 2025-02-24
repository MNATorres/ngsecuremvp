import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
import { Role } from './common/enums/role';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard, roleGuard],
    data: {
      roles: [Role.USER],
    },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-test/users-test.component').then(
        (m) => m.AdminTestComponent,
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      roles: [Role.ADMIN],
    },
  },
  {
    path: 'super-admin',
    loadComponent: () =>
      import('./pages/super-admin-test/super-admin-test.component').then(
        (m) => m.SuperAdminTestComponent,
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      roles: [Role.SUPER_ADMIN],
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
