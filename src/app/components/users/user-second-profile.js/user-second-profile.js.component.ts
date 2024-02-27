import { Component } from '@angular/core';
import { faCertificate, faCheck } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { IPostRes } from '../../../core/models/interfaces/posts';
import {  IUserProfileData, IUserRes } from '../../../core/models/interfaces/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../../core/services/user.service';
import { FollowButtonComponent } from '../../common/follow-button/follow-button.component';

@Component({
  selector: 'app-user-second-profile.js',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, FollowButtonComponent],
  templateUrl: './user-second-profile.js.component.html',
  styleUrl: './user-second-profile.js.component.css',
})
export class UserSecondProfileJsComponent {
  private destroy$ = new Subject<void>();
  imgUrl: string = `${environment.backendUrl}images/`;
  faCheck = faCheck;
  faCertificate = faCertificate;
  userProfile$!: Observable<IUserProfileData | null>;
  userPosts$!: Observable<IPostRes[] | null>;
  placeholder = 'assets/placeholder/profile.png';
  profileImg: string = '';
  userId$!: Observable<string>;
  userPostsCount!: number;
  followersCount!: number;
  followingCount!: number;

  constructor(private userService: UserService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.userId$ = this.router.params.pipe(map((params) => params['id']));

    this.userProfile$ = this.userId$.pipe(
      tap((userId) => console.log('userId:', userId)),
      switchMap((userId) => this.userService.getUserDetails(userId)),
      map((apiUserRes) => apiUserRes.data)
    );

    if (this.userId$) {
      this.userPosts$ = this.userId$.pipe(
        switchMap((userId) => this.userService.getUserPosts(userId)),
        map((response) => response.data)
      );
    }

    this.userProfile$.pipe(takeUntil(this.destroy$)).subscribe((userProfile) => {
      this.profileImg =
        userProfile && userProfile.profilePic ? `${this.imgUrl}${userProfile.profilePic}` : this.placeholder;
      if (userProfile) {
        this.userPostsCount = userProfile.postsCount;
        this.followersCount = userProfile.followersCount;
        this.followingCount = userProfile.followingCount;
      }
    });
  }

  handleFollowerCountChange($event: number) {
    this.followersCount = $event;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
