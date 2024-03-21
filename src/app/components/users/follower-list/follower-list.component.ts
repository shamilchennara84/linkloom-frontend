import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { IUserRes } from '../../../core/models/interfaces/users';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { select, Store } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';

import { Observable } from 'rxjs';
import { FollowerListRowComponent } from '../follower-list-row/follower-list-row.component';

@Component({
  selector: 'app-follower-list',
  standalone: true,
  imports: [CommonModule, FollowerListRowComponent],
  templateUrl: './follower-list.component.html',
  styleUrl: './follower-list.component.css',
})
export class FollowerListComponent implements OnInit {
  profileImg!: string;
  userId!: string;
  currentUserId!: string;
  users: IUserRes[] = [];
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  userProfile$!: Observable<IUserRes | null>;
  @Output() closeModal = new EventEmitter<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.subscribe((userProfile) => {
      this.currentUserId = userProfile?._id ?? '';
    });
    this.userId = this.data.userId;
    this.userService.getFollowerUsersList(this.userId).subscribe((response) => {
      if (response && response.data) {
        this.users = response.data;
      }
    });
  }

  close() {
    this.closeModal.emit();
  }
}