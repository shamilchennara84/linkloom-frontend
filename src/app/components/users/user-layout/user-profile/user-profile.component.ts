import { Component, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../../core/states/users/user.selector';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../../core/models/interfaces/users';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  faCheck = faCheck;
  faCertificate = faCertificate;
  userProfile$!:Observable<IUserRes | null>
  constructor(private store: Store) {}

  ngOnInit(): void {
        this.userProfile$ = this.store.pipe(select(selectUserDetails));
  }

}
