import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { ICommentRes } from '../../../core/models/interfaces/comments';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  imports: [CommentComponent, CommentFormComponent,CommonModule],
})
export class PostCommentsComponent implements OnInit {
  @Input() userId!: string;
  @Input() postId!: string;
  comments: ICommentRes[] = [];
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.getComments(this.postId).subscribe((comments) => {
      if (comments.data) {
        console.log(comments.data);
        this.comments = comments.data;
      } else {
        this.comments = [];
      }
    });
  }

  addComment(text: string, parentId: null | string): void {
    this.commentService.createComments(text, parentId, this.userId, this.postId).subscribe((createdComment) => {
      const newComment = createdComment.data;
      if (newComment) {
        console.log(newComment);
        this.comments = [...this.comments, newComment];
        console.log(this.comments);
      } else {
        console.log('error while creating comment');
      }
    });
  }
}
//
