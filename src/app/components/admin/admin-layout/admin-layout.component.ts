import { Component, computed, signal } from '@angular/core';
import { AdminSidenavComponent } from '../admin-sidenav/admin-sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidenavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
}
