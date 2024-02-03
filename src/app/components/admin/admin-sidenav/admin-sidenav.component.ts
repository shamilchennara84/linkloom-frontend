import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../core/models/types/menuItems';



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


