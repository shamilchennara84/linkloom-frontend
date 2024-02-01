import { Route } from '@angular/router';
import { loginGuard } from '../../core/guards/login.guard';



export default [
  {
    path: 'login',
    loadComponent: () => import('./user-login/user-login.component').then((c) => c.UserLoginComponent),
    
  },
  {
    path: 'signup',
    loadComponent: () => import('./user-signup/user-signup.component').then((c) => c.UserSignupComponent),
  },
  {
    path: 'otp',
    loadComponent: () => import('./user-otp/user-otp.component').then((c) => c.UserOtpComponent),
  },
  {
    path: 'resetpassword',
    loadComponent: () =>
      import('./user-resetpassword/user-resetpassword.component').then((c) => c.UserResetpasswordComponent),
  },
  {
    path: 'forgotpassword',
    loadComponent: () =>
      import('./user-forgotpassword/user-forgotpassword.component').then((c) => c.UserForgotpasswordComponent),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
] as Route[];
