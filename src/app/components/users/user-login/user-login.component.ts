import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [LogoComponent,RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {}
