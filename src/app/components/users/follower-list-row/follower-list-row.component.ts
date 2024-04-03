import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../core/models/interfaces/users';
import { environment } from '../../../../environments/environment';
import { FollowButtonComponent } from '../../common/follow-button/follow-button.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-follower-list-row',
  standalone: true,
  imports: [FollowButtonComponent, CommonModule, RouterModule],
  templateUrl: './follower-list-row.component.html',
  styleUrl: './follower-list-row.component.css',
})
export class FollowerListRowComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images`;
  placeholder = 'assets/placeholder/profile.png';
  @Input() user!: IUser;
  @Input() currentUserId!: string;
  userProfile!: string;
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.userProfile = this.user && this.user.profilePic ? `${this.imgUrl}${this.user.profilePic}` : this.placeholder;
  }

  onProfileClick() {
    this.close.emit();
  }
}
