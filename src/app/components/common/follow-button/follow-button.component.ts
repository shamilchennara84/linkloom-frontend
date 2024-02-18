import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Observable, map } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { FollowingStatus } from '../../../core/models/enums/follow';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  followingStatus$!: Observable<FollowingStatus | null>;
  @Input() userId!: string;
  userProfile$!: Observable<IUserRes | null>;
  statusString: string = 'Follow';
  @Input() followerCount!: number;
  @Output() followerCountChange = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.followingStatus$ = this.userService
      .followStatus(this.userId)
      .pipe(map((response) => (response && response.data ? response.data.status : null)));

    this.followingStatus$.subscribe((status) => {
      this.statusString = status ? status.toString() : 'Follow';
    });
  }

  onButtonClick() {
    {
      this.userService.followRequest(this.userId, this.statusString).subscribe((response) => {
        if (response && response.data) {
          this.statusString = response.data.status ? response.data.status.toString() : 'Follow';
          this.followerCount = response.data.count;
          this.followerCountChange.emit(this.followerCount);
        }
      });
    }
  }
}
