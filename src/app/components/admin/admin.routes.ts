import { Route } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export default [
  {
    path: 'login',
    loadComponent: () => import('./admin-login/admin-login.component').then((m) => m.AdminLoginComponent),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '', // Empty path for the default route
        redirectTo: 'home',
        pathMatch: 'full',
      },
      // Define your other routes here
      {
        path: 'home',
        loadComponent: () =>
          import('./admin-home/admin-home.component').then((m) => m.AdminHomeComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./admin-users/admin-users.component').then((m) => m.AdminUsersComponent),
      },
      // Add more routes as needed
    ],
  },
  { path: '**', redirectTo: 'login' }, // Redirect to login for unknown routes
] as Route[];
