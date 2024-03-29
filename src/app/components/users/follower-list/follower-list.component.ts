import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IUserRes } from '../../../core/models/interfaces/users';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { select, Store } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';

import { Observable, Subject, takeUntil } from 'rxjs';
import { FollowerListRowComponent } from '../follower-list-row/follower-list-row.component';

@Component({
  selector: 'app-follower-list',
  standalone: true,
  imports: [CommonModule, FollowerListRowComponent],
  templateUrl: './follower-list.component.html',
  styleUrl: './follower-list.component.css',
})
export class FollowerListComponent implements OnInit,OnDestroy {
  profileImg!: string;
  userId!: string;
  currentUserId!: string;
  users: IUserRes[] = [];
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  userProfile$!: Observable<IUserRes | null>;
  @Output() closeModal = new EventEmitter<void>();
  private destroy$ = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.pipe(takeUntil(this.destroy$)).subscribe((userProfile) => {
      this.currentUserId = userProfile?._id ?? '';
    });
    this.userId = this.data.userId;
    this.userService
      .getFollowerUsersList(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response && response.data) {
          this.users = response.data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.closeModal.emit();
  }
}