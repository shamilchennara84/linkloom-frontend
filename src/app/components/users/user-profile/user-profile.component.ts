import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IPostRes, ITaggedPost } from '../../../core/models/interfaces/posts';
import { UserService } from '../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePostComponent } from '../../post/profile-post/profile-post.component';
import { FollowerListComponent } from '../follower-list/follower-list.component';
import { FollowingListComponent } from '../following-list/following-list.component';
import Swal from 'sweetalert2';
import { deleteUserFromStore } from '../../../core/states/users/user.actions';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule, RouterModule, ProfilePostComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit,OnDestroy {
  imgUrl: string = `${environment.backendUrl}images/`;
  placeholder = 'assets/placeholder/profile.png';
  faCheck = faCheck;
  faCertificate = faCertificate;
  userProfile$!: Observable<IUserRes | null>;
  userPosts$!: Observable<IPostRes[] | null>;
  userSavedPosts$!: Observable<ITaggedPost[] | null>;
  profileImg: string = '';
  userId: string | undefined = undefined;
  userPostsCount!: number;
  followersCount!: number;
  followingCount!: number;
  user!: IUserRes | null;
  activeTab: string = 'post';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.pipe(takeUntil(this.unsubscribe$)).subscribe((userProfile) => {
      this.profileImg =
        userProfile && userProfile.profilePic ? `${this.imgUrl}${userProfile.profilePic}` : this.placeholder;
      this.user = userProfile;
      this.userId = userProfile?._id;
    });

    if (this.userId) {
      this.userService
        .getUserPosts(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response) => {
          this.userPosts$ = of(response.data);
        });
      this.userService
        .getUserSavedPosts(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response) => {
          console.log(response, 'user save post recieved');
          this.userSavedPosts$ = of(response.data);
        });

      this.userService
        .getUserDetails(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response) => {
          this.userPostsCount = response.data.postsCount;
          this.followersCount = response.data.followersCount;
          this.followingCount = response.data.followingCount;
        });
    }
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onLogout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    this.store.dispatch(deleteUserFromStore());
    void this.router.navigate(['/user/login']);
  }

  openDeleteAccountModal() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete my account!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteAccount().subscribe({
          next: () => {
            Swal.fire({
              title: 'Account Deleted',
              text: 'Your account has been deleted. If you need to recover your account, please contact the admin.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.onLogout();
            });
          },
          error: (error) => {
            console.error('Error deleting account:', error);
            Swal.fire('Error', 'There was an error deleting your account.', 'error');
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
