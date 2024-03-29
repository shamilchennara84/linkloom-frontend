import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCertificate, faCheck } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { IPostRes } from '../../../core/models/interfaces/posts';
import { IUserProfileData, IUserRes } from '../../../core/models/interfaces/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../../core/services/user.service';
import { FollowButtonComponent } from '../../common/follow-button/follow-button.component';
import { ProfilePostComponent } from '../../post/profile-post/profile-post.component';
import { MatDialog } from '@angular/material/dialog';
import { FollowerListComponent } from '../follower-list/follower-list.component';
import { FollowingListComponent } from '../following-list/following-list.component';

@Component({
  selector: 'app-user-second-profile.js',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FollowButtonComponent,
    FollowerListComponent,
    ProfilePostComponent,
  ],
  templateUrl: './user-second-profile.js.component.html',
  styleUrl: './user-second-profile.js.component.css',
})
export class UserSecondProfileJsComponent implements OnInit,OnDestroy{
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
  user!: IUserRes | null;

  constructor(private userService: UserService, private router: ActivatedRoute, private dialog: MatDialog) {}

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
        this.user = userProfile;
        this.userPostsCount = userProfile.postsCount;
        this.followersCount = userProfile.followersCount;
        this.followingCount = userProfile.followingCount;
      }
    });
  }

  openModal(post: IPostRes) {
    console.log(post);
    const dialogRef = this.dialog.open(ProfilePostComponent, {
      width: '80%',
      height: '80%',
      data: { post: post, userImageUrl: this.profileImg, user: this.user },
      panelClass: ['no-scroll'],
    });

    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.closeModal.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  handleFollowerCountChange($event: number) {
    this.followersCount = $event;
  }

  openFollowerListModal() {
    const dialogRef = this.dialog.open(FollowerListComponent, {
      width: '35%',
      height: '45%',
      data: {
        userId: this.user?._id,
      },
    });
    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.closeModal.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openFollowingListModal() {
    const dialogRef = this.dialog.open(FollowingListComponent, {
      width: '35%',
      height: '45%',
      data: {
        userId: this.user?._id,
      },
    });

    const dialogComponentInstance = dialogRef.componentInstance;

    dialogComponentInstance.closeModal.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
