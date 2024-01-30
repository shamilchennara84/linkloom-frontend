import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { otpConcateValidator } from '../../../core/helpers/validation';
import { OtpValidationComponent } from '../../common/otp-validation/otp-validation.component';
import { OTP_TIMER } from '../../../shared/constants';
import { formatTime } from '../../../core/helpers/timer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-otp',
  standalone: true,
  imports: [LogoComponent, ReactiveFormsModule, OtpValidationComponent],
  templateUrl: './user-otp.component.html',
  styleUrl: './user-otp.component.css',
})
export class UserOtpComponent {
  otpForm!: FormGroup;
  isSubmitted: boolean = false;
  reminingTime = 0;
  formattedTime: string = '03:00';
  otpResendCount: number = 0;
  showOTPResend: boolean = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group(
      {
        digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
        digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
        digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
        digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      },
      { validators: otpConcateValidator }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.otpForm.valid) {
      // Handle form submission logic here
      const concatenatedDigits =
        this.otpForm.value.digit1 + this.otpForm.value.digit2 + this.otpForm.value.digit3 + this.otpForm.value.digit4;
          const otp = { otp: concatenatedDigits };
      this.http.post('user/validateOTP', otp).subscribe({
        next: (res: any) => {
          if (res.error && res.error.message === 'maximum try for OTP exceeded') {
            void this.router.navigate(['../signup']);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User created successfully',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              void this.router.navigate(['../login']);
            });
          }
        },
      });
    }
  }

  startTimer(): void {
    this.reminingTime = OTP_TIMER;

    const timer = setInterval(() => {
      this.reminingTime--;
      if (this.reminingTime <= 0) {
        clearInterval(timer);
      }
      this.formattedTime = formatTime(this.reminingTime);
    }, 1000);
  }
}
