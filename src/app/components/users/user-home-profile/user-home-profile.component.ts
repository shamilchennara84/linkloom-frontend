import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { environment } from '../../../../environments/environment';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-home-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-home-profile.component.html',
  styleUrl: './user-home-profile.component.css',
})
export class UserHomeProfileComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  userProfile$!: Observable<IUserRes | null>;

  placeholder = 'assets/placeholder/profile.png';
  profileImg: string = '';
  userId: string | undefined = undefined;
  userPostsCount!: number;
  followersCount!: number;
  followingCount!: number;
  user!: IUserRes | null;

  constructor(private store: Store, private userService: UserService) {}
  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.subscribe((userProfile) => {
      this.profileImg =
        userProfile && userProfile.profilePic ? `${this.imgUrl}${userProfile.profilePic}` : this.placeholder;
      this.user = userProfile;
      this.userId = userProfile?._id;
    });

    if (this.userId) {
      this.userService.getUserDetails(this.userId).subscribe((response) => {
        this.userPostsCount = response.data.postsCount;
        this.followersCount = response.data.followersCount;
        this.followingCount = response.data.followingCount;
      });
    }
  }
}
