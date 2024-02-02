import { Route } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { UserChatroomComponent } from './user-chatroom/user-chatroom.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddPostComponent } from './user-add-post/user-add-post.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: UserHomeComponent,
      },
      {
        path: 'notification',
        component: UserNotificationComponent,
      },
      {
        path: 'chatroom',
        component: UserChatroomComponent,
      },
      {
        path: 'profile',
        children: [
          { path: '', component: UserProfileComponent },
          { path: 'edit/:id', component: UserProfileEditComponent },
        ],
      },
      {
        path: 'posts',
        component: UserAddPostComponent,
      },
      {
        path: 'search',
        component: UserSearchComponent,
      },
    ],
  },
] as Route[];
