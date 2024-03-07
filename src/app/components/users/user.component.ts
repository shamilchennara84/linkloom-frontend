import { Component } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserLoginComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

}
