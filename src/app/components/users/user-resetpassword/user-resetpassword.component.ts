import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';

@Component({
  selector: 'app-user-resetpassword',
  standalone: true,
  imports: [RouterLink,LogoComponent],
  templateUrl: './user-resetpassword.component.html',
  styleUrl: './user-resetpassword.component.css'
})
export class UserResetpasswordComponent {

}
