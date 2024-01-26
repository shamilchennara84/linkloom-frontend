import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullname-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fullname-validation.component.html',
  styleUrl: './fullname-validation.component.css',
})
export class FullnameValidationComponent {
  @Input() fNameControl: AbstractControl | null = null;
  @Input() isSubmitted: boolean = false;
}
