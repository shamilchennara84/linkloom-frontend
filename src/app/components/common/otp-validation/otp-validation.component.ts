import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import {  FormGroup } from '@angular/forms';


@Component({
  selector: 'app-otp-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.css',
})
export class OtpValidationComponent {
  @Input() otpForm: FormGroup | null = null;
  @Input() isSubmitted:boolean = false

  resendOTP() {
    throw new Error('Method not implemented.');
  }
}