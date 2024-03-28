import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { emailValidators, passwordValidators } from '../../../shared/validators';
import { validateByTrimming } from '../../../core/helpers/validation';
import { HttpClient } from '@angular/common/http';
import { EmailValidationComponent } from '../../common/email-validation/email-validation.component';
import { Router } from '@angular/router';
import { IApiUserAuthRes } from '../../../core/models/interfaces/users';
import { Store } from '@ngrx/store';
import { saveUserOnStore } from '../../../core/states/users/user.actions';
import { PasswordValidationComponent } from '../../common/password-validation/password-validation.component';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  imports: [LogoComponent, RouterLink, ReactiveFormsModule, EmailValidationComponent, PasswordValidationComponent],
})
export class UserLoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;
  isSubmitted = false;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

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
      this.http
        .post<IApiUserAuthRes>('user/login', user)
        .pipe(
          takeUntil(this.destroy$) // Automatically unsubscribe when the component is destroyed
        )
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('userAccessToken', res.accessToken);
            localStorage.setItem('userRefreshToken', res.refreshToken);
            if (res.data !== null) {
              console.log('Dispatching saveUserOnStore action with payload:', { userDetails: res.data });
              this.store.dispatch(saveUserOnStore({ userDetails: res.data }));
            }
            void this.router.navigate(['/user/home']);
          },
        });
    } else {
      console.log('error', this.loginForm.errors);
    }
  }

  showComingSoonAlert() {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'This service is currently under development and will be available soon.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
