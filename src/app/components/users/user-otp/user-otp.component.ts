import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/reusableComponents/logo/logo.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-otp',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './user-otp.component.html',
  styleUrl: './user-otp.component.css'
})
export class UserOtpComponent {
  otpForm!:FormGroup

  constructor(formBuilder:FormBuilder){}

  ngOnInit():void{
      this.otpForm = this.formBuilder.group({
          input1:['',[]]
      })
   }
}
