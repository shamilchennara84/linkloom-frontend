import { Component, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Observable, of } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IPostRes } from '../../../core/models/interfaces/posts';
import { UserService } from '../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePostComponent } from '../../post/profile-post/profile-post.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule, RouterModule, ProfilePostComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  faCheck = faCheck;
  faCertificate = faCertificate;
  userProfile$!: Observable<IUserRes | null>;
  userPosts$!: Observable<IPostRes[] | null>;
  placeholder = 'assets/placeholder/profile.png';
  profileImg: string = '';
  userId: string | undefined = undefined;
  userPostsCount!: number;
  followersCount!: number;
  followingCount!: number;

  constructor(private store: Store, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.subscribe((userProfile) => {
      this.profileImg =
        userProfile && userProfile.profilePic ? `${this.imgUrl}${userProfile.profilePic}` : this.placeholder;

      this.userId = userProfile?._id;
    });

    if (this.userId) {
      this.userService.getUserPosts(this.userId).subscribe((response) => {
        this.userPosts$ = of(response.data);
      });

      this.userService.getUserDetails(this.userId).subscribe((response) => {
        this.userPostsCount = response.data.postsCount;
        this.followersCount = response.data.followersCount;
        this.followingCount = response.data.followingCount;
      });
    }
  }

  openModal(post:IPostRes) {
    console.log(post);
    const dialogRef = this.dialog.open(ProfilePostComponent, {
      width: '50vw', // 55% of the viewport width
      height: '60vh', // 71.5% of the viewport height
      data: { userId: this.userId, post:post  },
    });

     const dialogComponentInstance = dialogRef.componentInstance;

 
     dialogComponentInstance.closeModal.subscribe(() => {
       dialogRef.close(); 
     });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
     
    });
  }
}
// {[liked]="post.likedByCurrentUser" [userId]="userId" [postId]="post._id" [postUser]="post.userId"    [userImageUrl]=" post.user[0].profilePic " [userName]="post.user[0].username | titlecase" [userLocation]="post.location" [postUrl]="imgUrl + post.postURL" [userLikes]="post.likeCount"></app-img-post>},
