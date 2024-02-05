import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validateByTrimming } from '../../../core/helpers/validation';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'
import { IApiUserAuthRes } from '../../../core/models/interfaces/users';
import { emailValidators, passwordValidators } from '../../../shared/validators';
import { EmailValidationComponent } from "../../common/email-validation/email-validation.component";
import { LogoSecondaryComponent } from '../../../shared/reusableComponents/logo-secondary/logo-secondary.component';
import { PasswordValidationComponent } from '../../common/password-validation/password-validation.component';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css',
    imports: [LogoSecondaryComponent, EmailValidationComponent,ReactiveFormsModule,PasswordValidationComponent]
})
export class AdminLoginComponent {


    loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
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
      const admin = this.loginForm.getRawValue();
      this.http.post<IApiUserAuthRes>('admin/login',admin).subscribe({
        next: (res: any) => {
          localStorage.setItem('adminAccessToken', res.accessToken);
          localStorage.setItem('adminRefreshToken', res.refreshToken);
          void this.router.navigate(['/admin/home']);
        },
      });
    } 
  }
}


