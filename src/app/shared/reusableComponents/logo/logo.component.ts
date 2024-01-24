import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `<div class="mb-4">
    <a [routerLink]="'../login'"><img
        src="assets/image/logo-white.png"
        alt="Your Logo"
        class="h-30 w-72 "
    /></a>
  </div>`,
})
export class LogoComponent {}
