import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-postreport-modal',
  standalone: true,
  imports: [],
  templateUrl: './postreport-modal.component.html',
  styleUrl: './postreport-modal.component.css',
})
export class PostreportModalComponent implements OnInit {
  imgPath: string = `${environment.backendUrl}images/`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  postImageUrl!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { imgUrl: string }) {}

  ngOnInit(): void {
    this.postImageUrl = this.data.imgUrl ? this.imgPath + this.data.imgUrl : this.userPlaceholderImageUrl;
  }
}
