import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { IUserRes } from '../../../core/models/interfaces/users';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from '../../common/table-filter/table-filter.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, TableFilterComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  users: IUserRes[] = [];
  currPage = 1;
  itemsPerPage = 10;
  searchQuery: string = '';
  userCount = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getAllUsers(this.currPage, this.itemsPerPage, this.searchQuery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res.data !== null) {
            this.users = res.data.users;
            this.userCount = res.data.userCount;
          }
        },
      });
  }

  onBlock(userId: string, action: 'Block' | 'Unblock'): void {
    void Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${action} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} him/her`,
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.blockUser(userId).subscribe({
          next: () => {
            const userIdx = this.users.findIndex((user) => user._id === userId);
            if (userIdx !== -1) {
              this.users = [
                ...this.users.slice(0, userIdx),
                { ...this.users[userIdx], isBlocked: !this.users[userIdx].isBlocked },
                ...this.users.slice(userIdx + 1),
              ];
            }
          },
        });
      }
    });
  }

  onSearchUsers(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.getUsers();
  }

  onPageChange(page: number): void {
    this.currPage = page;
    this.getUsers();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currPage = 1;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


