import { Component, Input, OnInit } from '@angular/core';
;
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() comment!: any;
  imgUrl: string = `${environment.backendUrl}images/`;
  @Input() userImageUrl!: string;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;

  ngOnInit(): void {
    this.userImageUrl = this.comment.user.profilePic;

    this.profileImg =
      this.comment && this.comment.user && this.comment.user.profilePic
        ? `${this.imgUrl}${this.comment.user.profilePic}`
        : this.userPlaceholderImageUrl;
  }
}
