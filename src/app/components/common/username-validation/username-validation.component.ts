import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './username-validation.component.html',
  styleUrl: './username-validation.component.css',
})
export class UsernameValidationComponent {
  @Input() userNameControl: AbstractControl | null = null;
  @Input() isSubmitted: boolean = false;
}
