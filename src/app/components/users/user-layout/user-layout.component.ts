import { Component, OnInit, computed, signal } from '@angular/core';
import { UserSidenavComponent } from './user-sidenav/UserSidenavComponent';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { selectUserDetails } from '../../../core/states/users/user.selector';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserSidenavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
  userDetails$!: Observable<IUserRes | null>;
}
