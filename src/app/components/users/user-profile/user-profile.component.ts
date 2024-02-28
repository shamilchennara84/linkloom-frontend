import { Component, OnInit} from '@angular/core';
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
import {  IPostRes } from '../../../core/models/interfaces/posts';
import { UserService } from '../../../core/services/user.service';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule, RouterModule],
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

  constructor(private store: Store, private userService: UserService) {}

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

      this.userService.getUserDetails(this.userId).subscribe((response)=>{
         this.userPostsCount = response.data.postsCount;
         this.followersCount = response.data.followersCount;
         this.followingCount = response.data.followingCount;
      })

    }




  }
}
