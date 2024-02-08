import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostControlComponent } from '../../post/post-control/post-control.component';
import {
  PlaceAutocompleteComponent,
  PlaceSearchResult,
} from '../../common/place-autocomplete/place-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Observable } from 'rxjs/internal/Observable';
import { IUserRes } from '../../../core/models/interfaces/users';

@Component({
  selector: 'app-user-add-post',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, PostControlComponent, PlaceAutocompleteComponent, FormsModule],
  templateUrl: './user-add-post.component.html',
  styleUrl: './user-add-post.component.css',
})
export class UserAddPostComponent implements OnInit {
  placeValue!: PlaceSearchResult | null;
  description!: string;
  userDetails$!: Observable<IUserRes | null>;
  userId = ' ';
  user: IUserRes | null = null;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.description = '';
    this.userDetails$ = this.store.pipe(select(selectUserDetails));

    this.userDetails$.subscribe((user) => {
      this.user = user ?? this.user;
      if (this.user !== null && this.user !== undefined) {
        this.userId = this.user._id;
      }
    });
  }
  
  imageReady(blob: Blob) {
    const formData = new FormData();
    formData.append('image', blob, this.user?.fullname + '.jpg');
  }
}
