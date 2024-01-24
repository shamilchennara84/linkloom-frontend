import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [LogoComponent,RouterLink],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {

}
