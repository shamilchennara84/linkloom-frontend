import { Component, Input } from '@angular/core';
import { INotificationRes } from '../../../core/models/interfaces/notification';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DateAgoPipe } from '../../../shared/pipes/date-ago.pipe';



@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, DateAgoPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Input() notification!: INotificationRes;
  imgUrl: string = `${environment.backendUrl}images/`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;

  ngOnInit(): void {
    this.profileImg = this.notification.relatedUser.profilePic
      ? this.imgUrl + this.notification.relatedUser.profilePic
      : this.userPlaceholderImageUrl;
  }
}
