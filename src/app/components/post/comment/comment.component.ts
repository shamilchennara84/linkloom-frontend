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
  @Input() userPlaceholderImageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200';

  ngOnInit(): void {
    this.userImageUrl =  this.comment.user.profilePic;
    
  }
}
