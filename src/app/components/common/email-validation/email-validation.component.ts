import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-email-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-validation.component.html',
  styleUrl: './email-validation.component.css'
})
export class EmailValidationComponent {
    @Input() emailControl:AbstractControl | null = null
    @Input() isSubmitted = false
}
