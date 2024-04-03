import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, combineLatest, debounceTime, map, startWith, switchMap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { IUserSearchItem } from '../../../core/models/interfaces/followers';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserHomeProfileComponent } from '../user-home-profile/user-home-profile.component';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    UserHomeProfileComponent,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css',
})
export class UserSearchComponent implements OnInit {
  imgUrl: string = `${environment.imageUrl}`;
  searchControl = new FormControl('');
  alluser$!: Observable<IUserSearchItem[] | null>;
  filtered$!: Observable<IUserSearchItem[] | null>;
  placeholder = 'assets/placeholder/profile.png';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.filtered$ = this.searchControl.valueChanges.pipe(
      debounceTime(1000), // Adjust the debounce time as needed
      switchMap((searchString) =>
        this.userService.searchUser(searchString ?? '').pipe(map((response) => response.data))
      )
    );
  }

  getProfile(userId: string) {
    console.log(userId);
    this.router.navigate(['/user/userprofile/', userId]);
  }
  getImageUrl(user: any): string {
    return user.profilePic ? `${this.imgUrl}${user.profilePic}` : this.placeholder;
  }
}
