import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';





export const APP_ROUTE: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/users/auth.routes'),
    canActivate: [loginGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./components/users/user-layout/user-child.routes'),
    canActivate: [authGuard], 
  },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];


 


