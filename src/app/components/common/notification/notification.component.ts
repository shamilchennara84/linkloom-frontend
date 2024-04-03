import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotificationWithUser } from '../../../core/models/interfaces/notification';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DateAgoPipe } from '../../../shared/pipes/date-ago.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, DateAgoPipe, FontAwesomeModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Output() closeClicked = new EventEmitter<string>();

  faWindowClose = faWindowClose;
  closeNotification() {
    throw new Error('Method not implemented.');
  }

  @Input() notification!: INotificationWithUser;
  imgUrl: string = `${environment.imageUrl}`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;

  ngOnInit(): void {
    this.profileImg = this.notification.relatedUser.profilePic
      ? this.imgUrl + this.notification.relatedUser.profilePic
      : this.userPlaceholderImageUrl;
  }

  onCloseClick() {
    this.closeClicked.emit(this.notification._id);
  }
}
