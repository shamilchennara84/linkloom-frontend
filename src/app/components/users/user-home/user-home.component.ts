import { Component } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [UserLayoutComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent {}
