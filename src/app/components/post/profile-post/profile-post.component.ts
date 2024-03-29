import { Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../core/services/user.service';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { RouterModule } from '@angular/router';
import { IPostRes } from '../../../core/models/interfaces/posts';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-post',
  standalone: true,
  imports: [CommonModule, PostCommentsComponent, RouterModule],
  templateUrl: './profile-post.component.html',
  styleUrl: './profile-post.component.css',
})
export class ProfilePostComponent implements OnDestroy {
  imgUrl: string = `${environment.backendUrl}images/`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  postPlaceholderImageUrl: string = 'assets/placeholder/post.png';
  postId!: string;
  userLikes!: number;
  postUrl!: string;
  liked: boolean = false;
  profileImg!: string;
  commentModal = false;
  @Input() post!: IPostRes;
  @Input() userName!: string;
  @Input() userImageUrl!: string;
  @Input() userId: string | undefined;
  @Input() postUser!: string;
  @Output() closeModal = new EventEmitter<void>();
  userProfile$!: Observable<IUserRes | null>;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  toggleLike(event: Event) {
    event.stopPropagation();
    this.liked = !this.liked;
    if (this.userId && this.postUrl) {
      if (this.liked) {
        this.userService
          .likePost(this.userId, this.postId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.userLikes = response.data?.count ?? this.userLikes;
            },
            error: (error) => {
              console.error('Error liking post:', error);
            },
          });
      } else {
        this.userService
          .unlikePost(this.userId, this.postId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.userLikes = response.data?.count ?? this.userLikes;
            },
            error: (error) => {
              console.error('Error unliking post:', error);
            },
          });
      }
    }
  }
  close() {
    this.closeModal.emit();
  }

  toggleCommentModal(event: Event) {
    this.commentModal = !this.commentModal;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
