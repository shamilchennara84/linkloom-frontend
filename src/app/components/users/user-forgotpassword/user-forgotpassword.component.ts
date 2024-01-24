import { Component } from '@angular/core';
import { LogoComponent } from "../../../shared/reusableComponents/logo/logo.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-forgotpassword',
    standalone: true,
    templateUrl: './user-forgotpassword.component.html',
    styleUrl: './user-forgotpassword.component.css',
    imports: [LogoComponent,RouterLink]
})
export class UserForgotpasswordComponent {

}
