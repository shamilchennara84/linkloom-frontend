import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { emailValidators, passwordValidators } from '../../../shared/validators';
import { validateByTrimming } from '../../../core/helpers/validation';
import { HttpClient } from '@angular/common/http';
import { EmailValidationComponent } from "../../common/email-validation/email-validation.component";
import { Router } from '@angular/router';
import { IApiUserAuthRes } from '../../../core/models/interfaces/users';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  imports: [LogoComponent, RouterLink, ReactiveFormsModule, EmailValidationComponent],
})
export class UserLoginComponent {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [validateByTrimming(emailValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]],
    });
  }

  get f(): Record<string, AbstractControl> {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.loginForm.invalid) {
      const user = this.loginForm.getRawValue();
      this.http.post<IApiUserAuthRes>('user/login', user).subscribe({
        next: (res: any) => {
          localStorage.setItem('userAccessToken', res.accessToken);
          localStorage.setItem('userRefreshToken', res.refreshToken);
          void this.router.navigate(['/user']);
        },
      });
    } else {
      console.log('error', this.loginForm.errors);
    }
  }
}
