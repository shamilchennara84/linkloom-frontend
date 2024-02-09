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
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-post',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, PostControlComponent, PlaceAutocompleteComponent, FormsModule],
  templateUrl: './user-add-post.component.html',
  styleUrl: './user-add-post.component.css',
})
export class UserAddPostComponent implements OnInit {
  imageFile: Blob | null = null;
  userDetails$!: Observable<IUserRes | null>;
  userId = ' ';
  user!: IUserRes 
  placeValue!: PlaceSearchResult | null;
  postQuote!: string;

  constructor(private store: Store,private http:HttpClient,private router:Router) {}
  
  handlePlaceChange(event: PlaceSearchResult) {
    console.log('Place changed:', event);
    this.placeValue = event;
  }

  ngOnInit(): void {
    this.postQuote = '';
    this.userDetails$ = this.store.pipe(select(selectUserDetails));

    this.userDetails$.subscribe((user) => {
      this.user = user ?? this.user;
      if (this.user !== null && this.user !== undefined) {
        this.userId = this.user._id;
      }
    });
  }

  imageReady(blob: Blob) {
    this.imageFile = blob;
    console.log(blob);
  }

  onSubmit() {
    const formData = new FormData();
    let hasError = false;
    let errorMessages = [];
    formData.append('userId',this.user?._id)
    // Check if imageFile is not null
    if (!this.imageFile) {
      errorMessages.push('Image is not selected!');
      hasError = true;
    } else {
      formData.append('Image', this.imageFile, this.user?.fullname + '.jpg');
    }

    // Validate quote
    if (!this.postQuote || this.postQuote.trim().length === 0) {
      errorMessages.push('Quote cannot be empty!');
      hasError = true;
    } else {
      formData.append('caption', this.postQuote);
    }

    // Validate placeValue
    if (!this.placeValue || !this.placeValue.name) {
      errorMessages.push('Place is not selected!');
      hasError = true;
    } else {
      formData.append('location', JSON.stringify(this.placeValue.name));
    }

    // Only proceed if there are no errors
    if (!hasError) {
      this.http.post('user/addPost', formData).subscribe({
        next: (res: any) => {
          
          void this.router.navigate(['/user/profile']);
        },
      });}
    
    
    else {
      // Display all error messages
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errorMessages.join('<br/>'),
      });
    }
  }
}
