import { Component, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserLayoutComponent, CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  imgUrl: string = `${environment.backendUrl}images/`;
  faCheck = faCheck;
  faCertificate = faCertificate;
  userProfile$!: Observable<IUserRes | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
  }
}
