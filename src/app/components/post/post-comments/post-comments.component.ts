import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { ICommentRes } from '../../../core/models/interfaces/comments';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-comments',
  standalone: true,
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  imports: [CommentComponent, CommentFormComponent, CommonModule],
})
export class PostCommentsComponent implements OnInit,OnDestroy {
  @Input() userId: string | undefined;
  @Input() postId!: string;
  @Output() commentCount: EventEmitter<number> = new EventEmitter<number>();

  comments: ICommentRes[] = [];
  dropdownVisible = false;
  private subscriptions: Subscription[] = [];
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    const commentsSubscription = this.commentService.getComments(this.postId).subscribe((comments) => {
      if (comments.data) {
        console.log(comments.data);
        this.comments = comments.data;
      } else {
        this.comments = [];
      }
    });
    this.subscriptions.push(commentsSubscription);
  }

  addComment(text: string): void {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }
    const addCommentSubscription = this.commentService
      .createComments(text, this.userId, this.postId)
      .subscribe((createdComment) => {
        const newComment = createdComment.data;
        if (newComment) {
          console.log(newComment);
          this.comments = [...this.comments, newComment];
          console.log(this.comments);
          this.commentCount.emit(this.comments.length);
        } else {
          console.log('error while creating comment');
        }
      });
    this.subscriptions.push(addCommentSubscription);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onCommentRemoved(commentId: string) {
    const removeCommentSubscription = this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter((comment) => comment._id !== commentId);
        console.log('Comment removed:', commentId);
        this.commentCount.emit(this.comments.length);
      },
      error: (error: Error) => {
        console.error('Failed to remove comment:', error);
      },
    });
    this.subscriptions.push(removeCommentSubscription);
  }

  onCommentReported(commentId: string) {
    console.log('comment reported', commentId);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comment Reported',
      showConfirmButton: false,
      timer: 1500, // Duration in milliseconds
      toast: true, // Enable toast mode
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
