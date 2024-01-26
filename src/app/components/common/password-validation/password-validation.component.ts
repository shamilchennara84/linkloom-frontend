import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-password-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-validation.component.html',
  styleUrl: './password-validation.component.css',
})
export class PasswordValidationComponent {
  @Input() passwordControl: AbstractControl | null = null;
  @Input() isSubmitted = false;
}
