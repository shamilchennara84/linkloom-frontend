import { Component, OnInit } from '@angular/core';
import { FollowRequestComponent } from '../../common/follow-request/follow-request.component';
import { CommonModule } from '@angular/common';
import { FollowRequestAction, INotificationRes } from '../../../core/models/interfaces/notification';
import { SocketService } from '../../../core/services/socket.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationComponent } from '../../common/notification/notification.component';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [FollowRequestComponent, CommonModule, MatProgressSpinnerModule, FontAwesomeModule, NotificationComponent],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
})
export class NotificationListComponent implements OnInit {
  private allNotificationSubscription: Subscription | undefined;
  private notificationSubscription: Subscription | undefined;
  allNotification: INotificationRes[] = [];
  isLoading: boolean = false;
  faBell = faBell;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.isLoading = true; // Start loading
    console.log('Subscribing to notifications');
    this.allNotificationSubscription = this.socketService.allNotifications$.subscribe({
      next: (notifications) => {
        this.allNotification = notifications;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.isLoading = false;
      },
    });
    this.socketService.getNotifications();

    this.notificationSubscription = this.socketService.notifications$.subscribe({
      next: (notification: INotificationRes) => {
        // console.log(this.allNotification);
        // console.log(notification);
        this.allNotification.push(notification);
      },
      error: (error) => {
        console.error('Error fetching notification:', error);
      },
    });
  }

  deleteNotification(notificationId: string): void {
    this.allNotification = this.allNotification.filter((notification) => notification._id !== notificationId);
  }

  handleAction(event: FollowRequestAction) {
    const notificationId = event.notificationId;

    if (event.action === 'accept') {
      this.socketService.acceptFollowRequest(notificationId).subscribe((res) => {
        this.deleteNotification(notificationId);
      });
    } else if (event.action === 'decline') {
      this.socketService.declineFollowRequest(notificationId).subscribe({
        next: () => {
          this.deleteNotification(notificationId);
        },
        error: (error: Error) => {
          console.error('Error declining follow request:', error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.allNotificationSubscription) {
      this.allNotificationSubscription.unsubscribe();
    }
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
