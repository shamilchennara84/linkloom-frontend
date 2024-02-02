import { Component } from '@angular/core';
import { UserLayoutComponent } from '../user-layout.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck,faCertificate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  faCheck = faCheck;
  faCertificate = faCertificate;

  posts: { link: string }[] = [
    {
      link: 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true',
    },
    {
      link: 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true',
    },
    {
      link: 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true',
    },
    {
      link: 'https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true',
    },
  ];
}
