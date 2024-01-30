import { Component } from '@angular/core';
import { UserLayoutComponent } from '../user-layout.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
 
}
