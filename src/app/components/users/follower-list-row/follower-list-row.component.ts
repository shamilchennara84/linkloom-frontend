import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/interfaces/users';
import { environment } from '../../../../environments/environment';
import { FollowButtonComponent } from '../../common/follow-button/follow-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-follower-list-row',
  standalone: true,
  imports: [FollowButtonComponent,CommonModule],
  templateUrl: './follower-list-row.component.html',
  styleUrl: './follower-list-row.component.css',
})
export class FollowerListRowComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  placeholder = 'assets/placeholder/profile.png';
  @Input() user!: IUser;
  @Input() currentUserId!: string;
  userProfile!: string;

  ngOnInit() {
    this.userProfile = this.user && this.user.profilePic ? `${this.imgUrl}${this.user.profilePic}` : this.placeholder;
  }
}
