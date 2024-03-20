import { Component, OnInit } from '@angular/core';
import { ImgPostComponent } from '../../post/img-post/img-post.component';
import { Store, select } from '@ngrx/store';
import { UserService } from '../../../core/services/user.service';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Observable, of } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { IPostUserRes } from '../../../core/models/interfaces/posts';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { UserHomeProfileComponent } from '../user-home-profile/user-home-profile.component';
import { UserSearchComponent } from '../user-search/user-search.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [ImgPostComponent, CommonModule, UserHomeProfileComponent, UserSearchComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  userProfile$!: Observable<IUserRes | null>;
  userId: string | undefined;
  homePosts$!: Observable<IPostUserRes[] | null>;

  constructor(private store: Store, private userService: UserService) {}
  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.subscribe((userProfile) => {
      this.userId = userProfile?._id;
    });
    if (this.userId) {
      this.userService.getLatestPosts(this.userId).subscribe((response) => {
        this.homePosts$ = of(response.data);
       
      });
    }
  }
}
