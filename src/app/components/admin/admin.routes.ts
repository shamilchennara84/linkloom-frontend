import { Route } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { loginGuard } from '../../core/guards/login.guard';
import { authGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: 'login',
    loadComponent: () => import('./admin-login/admin-login.component').then((m) => m.AdminLoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild:[authGuard],
    children: [
      {
        path: '', // Empty path for the default route
        redirectTo: 'home',
        pathMatch: 'full',
      },
      // Define your other routes here
      {
        path: 'home',
        loadComponent: () => import('./admin-home/admin-home.component').then((m) => m.AdminHomeComponent),
        
      },
      {
        path: 'users',
        loadComponent: () => import('./admin-users/admin-users.component').then((m) => m.AdminUsersComponent),
        
      },
      {
        path: 'postReports',
        loadComponent: () => import('./admin-postreports/admin-postreports.component').then((m) => m.AdminPostreportsComponent),
        
      },
      // Add more routes as needed
    ],
  },
  { path: '**', redirectTo: 'login' }, // Redirect to login for unknown routes
] as Route[];
