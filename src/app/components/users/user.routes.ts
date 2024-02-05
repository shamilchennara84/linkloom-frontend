import { Route } from '@angular/router';
import { loginGuard } from '../../core/guards/login.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: 'login',
    loadComponent: () => import('./user-login/user-login.component').then((c) => c.UserLoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./user-signup/user-signup.component').then((c) => c.UserSignupComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'otp',
    loadComponent: () => import('./user-otp/user-otp.component').then((c) => c.UserOtpComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'resetpassword',
    loadComponent: () =>
      import('./user-resetpassword/user-resetpassword.component').then((c) => c.UserResetpasswordComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'forgotpassword',
    loadComponent: () =>
      import('./user-forgotpassword/user-forgotpassword.component').then((c) => c.UserForgotpasswordComponent),
    canActivate: [loginGuard],
  },

  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '', // Empty path for the default route
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./user-home/user-home.component').then((c) => c.UserHomeComponent),
        canActivate: [authGuard],
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./user-notification/user-notification.component').then((c) => c.UserNotificationComponent),
        canActivate: [authGuard],
      },
      {
        path: 'chatroom',
        loadComponent: () => import('./user-chatroom/user-chatroom.component').then((c) => c.UserChatroomComponent),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        canActivate:[authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./user-profile/user-profile.component').then((c) => c.UserProfileComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./user-profile-edit/user-profile-edit.component').then((c) => c.UserProfileEditComponent),
          },
        ],
      },
      {
        path: 'posts',
        loadComponent: () => import('./user-add-post/user-add-post.component').then((c) => c.UserAddPostComponent),
        canActivate: [authGuard],
      },
      {
        path: 'search',
        loadComponent: () => import('./user-search/user-search.component').then((c) => c.UserSearchComponent),
        canActivate: [authGuard],
      },
      // Add more routes as needed
    ],
  },

  { path: '**', redirectTo: 'login' }, // Redirect to login for unknown routes
] as Route[];
