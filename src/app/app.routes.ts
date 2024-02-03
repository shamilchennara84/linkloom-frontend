import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';





export const APP_ROUTE: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./components/users/user.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.routes'),
  },

  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent,
  },
];


 


