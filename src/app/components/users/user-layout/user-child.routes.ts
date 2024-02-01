import { Route } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { authGuard } from '../../../core/guards/auth.guard';

export default [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./user-home/user-home.component').then((c) => c.UserHomeComponent),
       
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./user-notification/user-notification.component').then((c) => c.UserNotificationComponent),
     
      },
      {
        path: 'chatroom',
        loadComponent: () => import('./user-chatroom/user-chatroom.component').then((c) => c.UserChatroomComponent),
  
      },
      {
        path: 'profile',
        loadComponent: () => import('./user-profile/user-profile.component').then((c) => c.UserProfileComponent),
        
      },
      {
        path: 'posts',
        loadComponent: () => import('./user-add-post/user-add-post.component').then((c) => c.UserAddPostComponent),
       
      },
      {
        path: 'search',
        loadComponent: () => import('./user-search/user-search.component').then((c) => c.UserSearchComponent),
        
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
] as Route[];
