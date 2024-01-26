import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-mobile-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-validation.component.html',
  styleUrl: './mobile-validation.component.css'
})
export class MobileValidationComponent {
@Input() mobileControl:AbstractControl | null = null
@Input() isSubmitted:boolean = false
}