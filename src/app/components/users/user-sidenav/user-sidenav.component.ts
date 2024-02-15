import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuItem } from '../../../core/models/types/menuItems';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-user-sidenav',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, MatIconModule, CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './user-sidenav.component.html',
  styleUrl: './user-sidenav.component.css',
})
export class UserSidenavComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  sideNavCollapsed = signal(true);
  userDetails$!: Observable<IUserRes | null>;
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  placeholder = 'assets/placeholder/profile.png';
  profileImg: string = '';

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.userDetails$ = this.store.pipe(select(selectUserDetails));
    this.userDetails$.subscribe((userProfile) => {
      this.profileImg =
        userProfile && userProfile.profilePic ? `${this.imgUrl}${userProfile.profilePic}` : this.placeholder;
    });
  }
  onLogout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    void this.router.navigate(['/user/login']);
  }
  showConfirmDialog() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onLogout();
      }
    });
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: '/user/home',
    },
    {
      icon: 'search',
      label: 'Search',
      route: './user/search',
    },
    {
      icon: 'notification_important',
      label: 'Notification',
      route: '/user/notification',
    },
    {
      icon: 'chat',
      label: 'Chat',
      route: '/user/chatroom',
    },
    {
      icon: 'add_a_photo',
      label: 'Posts',
      route: '/user/posts',
    },
  ]);
}
