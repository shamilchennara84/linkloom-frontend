import { Component, computed, signal } from '@angular/core';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserSidenavComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule,RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  collapsed = signal(true);

  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
}
