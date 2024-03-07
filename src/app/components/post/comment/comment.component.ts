import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ICommentRes } from '../../../core/models/interfaces/comments';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() comment!: ICommentRes;
  @Input() userId: string | undefined;
  @Input() userImageUrl!: string;
  @Output() commentRemoved = new EventEmitter<string>();
  @Output() commentReported = new EventEmitter<string>();
  imgUrl: string = `${environment.backendUrl}images/`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;
  showDropdown = false;

  ngOnInit(): void {
    this.userImageUrl = this.comment.user.profilePic;

    this.profileImg =
      this.comment && this.comment.user && this.comment.user.profilePic
        ? `${this.imgUrl}${this.comment.user.profilePic}`
        : this.userPlaceholderImageUrl;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onRemoveComment() {
    this.commentRemoved.emit(this.comment._id);
  }
  onReportComment() {
    this.commentReported.emit(this.comment._id);
    this.toggleDropdown();
  }
}
