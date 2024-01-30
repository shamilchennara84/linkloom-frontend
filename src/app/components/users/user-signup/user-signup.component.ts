import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator, validateByTrimming } from '../../../core/helpers/validation';
import {
  emailValidators,
  mobileValidators,
  nameValidators,
  passwordValidators,
  userNameValidators,
} from '../../../shared/validators';
import { FullnameValidationComponent } from '../../common/fullname-validation/fullname-validation.component';
import { EmailValidationComponent } from '../../common/email-validation/email-validation.component';
import { UserResetpasswordComponent } from '../user-resetpassword/user-resetpassword.component';
import { UsernameValidationComponent } from '../../common/username-validation/username-validation.component';
import { PasswordValidationComponent } from '../../common/password-validation/password-validation.component';
import { MobileValidationComponent } from '../../common/mobile-validation/mobile-validation.component';
import { RepeatPasswordValidationComponent } from '../../common/repeat-password-validation/repeat-password-validation.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    ReactiveFormsModule,
    FullnameValidationComponent,
    UsernameValidationComponent,
    EmailValidationComponent,
    PasswordValidationComponent,
    UserResetpasswordComponent,
    MobileValidationComponent,
    RepeatPasswordValidationComponent,
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
})
export class UserSignupComponent {
  signupForm!: FormGroup;
  isSubmitted = false;
 

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', [validateByTrimming(nameValidators)]],
      username: ['', [validateByTrimming(userNameValidators)]],
      email: ['', [validateByTrimming(emailValidators)]],
      mobile: ['', [validateByTrimming(mobileValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword: [''],
    },{validators:passwordMatchValidator});
  }

  get f(): Record<string, AbstractControl> {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    // console.log(this.signupForm.invalid, this.signupForm.get('confirmPassword'), this.signupForm.get('fullname'));
    if (!this.signupForm.invalid) {
      const user = this.signupForm.getRawValue()
      console.log(user);
      this.http.post('user/register',user).subscribe({
        next:(res:any) =>{
           localStorage.setItem('userAuthToken', res.token);
           void this.router.navigate(['../otp']);
        }
      })
    }
    else {
      console.log('error', this.signupForm.errors)
    }
  }
}
