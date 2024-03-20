import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FollowRequestAction, INotificationRes, NotificationType } from '../../../core/models/interfaces/notification';
import { environment } from '../../../../environments/environment';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-follow-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-request.component.html',
  styleUrl: './follow-request.component.css',
})
export class FollowRequestComponent implements OnInit {
  @Input() notification!: INotificationRes;
  @Output() action = new EventEmitter<FollowRequestAction>();
  imgUrl: string = `${environment.backendUrl}images/`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;
  ngOnInit(): void {
    this.profileImg = this.notification.relatedUser.profilePic
      ? this.imgUrl + this.notification.relatedUser.profilePic
      : this.userPlaceholderImageUrl;
  }

  constructor(private socketService: SocketService) {}

  accept() {
    this.action.emit({ action: 'accept', notificationId: this.notification._id });
    this.socketService.sendNotification({
      type: NotificationType.AcceptedRequest,
      message: 'Your friend request accepted by',
      timestamp: new Date(),
      userId: this.notification.relatedUserId ?? '',
      relatedUserId: this.notification.userId,
      isRead: false,
    });
  }

  decline() {
    this.action.emit({ action: 'decline', notificationId: this.notification._id });
  }
}
