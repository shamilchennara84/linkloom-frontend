import { Component, OnInit } from '@angular/core';
import { FollowRequestComponent } from '../../common/follow-request/follow-request.component';
import { CommonModule } from '@angular/common';
import { FollowRequestAction, INotificationWithUser } from '../../../core/models/interfaces/notification';
import { SocketService } from '../../../core/services/socket.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationComponent } from '../../common/notification/notification.component';
import Swal from 'sweetalert2';

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
  allNotification: INotificationWithUser[] = [];
  isLoading: boolean = false;
  faBell = faBell;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.isLoading = true; // Start loading
    console.log('Subscribing to notifications');
    this.allNotificationSubscription = this.socketService.allNotifications$.subscribe({
      next: (notifications) => {
        this.allNotification = notifications;
        console.log(this.allNotification);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.isLoading = false;
      },
    });
    this.socketService.getNotifications();

    this.notificationSubscription = this.socketService.notifications$.subscribe({
      next: (notification: INotificationWithUser) => {
        // console.log(this.allNotification);
        // console.log(notification);
        this.allNotification.push(notification);
      },
    });
  }

  deleteNotification(notificationId: string): void {
    this.socketService.removeNotification(notificationId).subscribe({
      next: (response) => {
        console.log('Notification removed successfully', response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Notification removed successfully.',
          showConfirmButton: false,
          timer: 1500, // Duration in milliseconds
          toast: true, // Enable toast mode
        });
      },
      error: (error) => {
        console.error('Error removing notification', error);
      },
    });
    this.allNotification = this.allNotification.filter((notification) => notification._id !== notificationId);
  }

  handleAction(event: FollowRequestAction) {
    const notificationId = event.notificationId;

    if (event.action === 'accept') {
      this.socketService.acceptFollowRequest(notificationId).subscribe((res) => {
        this.allNotification = this.allNotification.filter((notification) => notification._id !== notificationId);
      });
    } else if (event.action === 'decline') {
      this.socketService.declineFollowRequest(notificationId).subscribe({
        next: () => {
          this.allNotification = this.allNotification.filter((notification) => notification._id !== notificationId);
        },
        error: (error: Error) => {
          console.error('Error declining follow request:', error);
        },
      });
    }
  }

  handleCloseClick(notificationId: string) {
    this.deleteNotification(notificationId);
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
