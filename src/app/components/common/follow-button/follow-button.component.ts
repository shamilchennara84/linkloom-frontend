import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Observable, map } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { FollowingStatus } from '../../../core/models/enums/follow';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../core/services/socket.service';
import { NotificationType } from '../../../core/models/interfaces/notification';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  @Input() userId!: string;
  @Input() followerCount : number | undefined;
  @Output() followerCountChange = new EventEmitter<number>();
  userProfile$!: Observable<IUserRes | null>;
  followingStatus$!: Observable<FollowingStatus | null>;
  currentUserProfile$!: Observable<IUserRes | null>;
  statusString: string = 'Follow';
  currentUserId: string | undefined;
  currentUserUsername!: string | undefined;

  constructor(private userService: UserService, private socketService: SocketService, private store: Store) {}

  ngOnInit() {
    this.currentUserProfile$ = this.store.pipe(select(selectUserDetails));
    this.currentUserProfile$.subscribe((userProfile) => {
      this.currentUserId = userProfile?._id;
      this.currentUserUsername = userProfile?.username;
    });

    this.followingStatus$ = this.userService
      .followStatus(this.userId)
      .pipe(map((response) => (response && response.data ? response.data.status : null)));

    this.followingStatus$.subscribe((status) => {
      this.statusString = status ? status.toString() : 'Follow';
      console.log(this.statusString);
    });
  }

  onButtonClick() {
    {
      this.userService.followRequest(this.userId, this.statusString).subscribe((response) => {
        if (response && response.data) {
           if (this.statusString === 'Request') {
             this.socketService.sendNotification({
               type: NotificationType.FollowRequest,
               message: 'You have a new follow request from',
               timestamp: new Date(),
               userId: this.userId,
               relatedUserId: this.currentUserId,
               isRead:false
             });
           }
          this.statusString = response.data.status ? response.data.status.toString() : 'Follow';
   
          this.followerCount = response.data.count;
          if (this.followerCount !== undefined) {
            this.followerCountChange.emit(this.followerCount);
          }
          
          
         
        }
      });
    }
  }
}
