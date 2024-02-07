import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostControlComponent } from '../../post/post-control/post-control.component';


@Component({
  selector: 'app-user-add-post',
  standalone: true,
  imports: [MatToolbarModule,CommonModule,PostControlComponent],
  templateUrl: './user-add-post.component.html',
  styleUrl: './user-add-post.component.css',
})
export class UserAddPostComponent {
  
  
  constructor() {}
  
  imageReady(blob: Blob) {
  console.log(blob);
  }
}