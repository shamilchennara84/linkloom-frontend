import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/types/menuItems';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, MatIconModule, CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.css',
})
export class AdminSidenavComponent {
  sideNavCollapsed = signal(true);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  constructor(private router: Router) {}

  showConfirmDialog(): void {
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

  onLogout(): void {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    void this.router.navigate(['/admin/login']);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/admin/dashboard',
    },
    {
      icon: 'supervisor_account',
      label: 'Users',
      route: '/admin/users',
    },
  ]);
}
