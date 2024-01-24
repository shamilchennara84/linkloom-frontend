import { Route } from '@angular/router';

export default [
    { path: 'login',loadComponent:()=>import('./user-login/user-login.component').then((c)=>c.UserLoginComponent) },
    { path: 'home',loadComponent:()=>import('./user-home/user-home.component').then((c)=>c.UserHomeComponent) },
    { path: 'signup',loadComponent:()=>import('./user-signup/user-signup.component').then((c)=>c.UserSignupComponent) },
    { path: 'otp',loadComponent:()=>import('./user-otp/user-otp.component').then((c)=>c.UserOtpComponent) },
    { path: 'resetpassword',loadComponent:()=>import('./user-resetpassword/user-resetpassword.component').then((c)=>c.UserResetpasswordComponent) },
    { path: 'forgotpassword',loadComponent:()=>import('./user-forgotpassword/user-forgotpassword.component').then((c)=>c.UserForgotpasswordComponent) },
    { path: '',redirectTo:'/login',pathMatch:'full' },
] as Route[];

// export const USER_ROUTE: Routes = [
//   { path: 'home', component: UserHomeComponent },
//   { path: 'login', component: UserLoginComponent },
//   { path: 'signup', component: UserSignupComponent },
//   { path: 'otp', component: UserOtpComponent },
//   { path: 'resetpassword', component: UserResetpasswordComponent },
// ];