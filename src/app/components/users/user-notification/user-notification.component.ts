import { Component } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [UserLayoutComponent],
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css',
})
export class UserNotificationComponent {}
