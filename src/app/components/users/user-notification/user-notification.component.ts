import { Component } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';

import { CommonModule } from '@angular/common';
import { FollowRequestComponent } from '../../common/follow-request/follow-request.component';

import { NotificationListComponent } from '../notification-list/notification-list.component';

@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FollowRequestComponent, NotificationListComponent],
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css',
})
export class UserNotificationComponent {}
