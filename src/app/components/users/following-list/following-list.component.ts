import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserRes } from '../../../core/models/interfaces/users';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { FollowerListRowComponent } from '../follower-list-row/follower-list-row.component';

@Component({
  selector: 'app-following-list',
  standalone: true,
  imports: [CommonModule, FollowerListRowComponent],
  templateUrl: './following-list.component.html',
  styleUrl: './following-list.component.css',
})
export class FollowingListComponent implements OnDestroy {
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
    .getFollowingUsersList(this.userId)
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
