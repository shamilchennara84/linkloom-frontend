import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-repeat-password-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repeat-password-validation.component.html',
  styleUrl: './repeat-password-validation.component.css',
})
export class RepeatPasswordValidationComponent {
  @Input() repeatPassControl: AbstractControl | null = null;
  @Input() isSubmitted = false;

}
