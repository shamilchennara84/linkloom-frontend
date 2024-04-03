import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalComponent } from '../../users/report-modal/report-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-img-post',
  standalone: true,
  imports: [CommonModule, PostCommentsComponent, RouterModule],
  templateUrl: './img-post.component.html',
  styleUrl: './img-post.component.css',
})
export class ImgPostComponent implements OnInit, OnDestroy {
  imgUrl: string = `${environment.imageUrl}`;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  @Input() userName!: string;
  @Input() userLocation!: string;
  @Input() userImageUrl!: string;
  @Input() postUrl!: string;
  @Input() userLikes!: number;
  @Input() userId: string | undefined;
  @Input() postId!: string;
  @Input() postUser!: string;
  @Input() liked: boolean = false;
  @Input() tagged: boolean = false;
  @Input() userComments!: number;
  @Input() reported!: boolean;
  commentModal: boolean = false;
  profileImg!: string;

  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    // console.log('post image');
    this.profileImg = this.userImageUrl ? this.imgUrl + this.userImageUrl : this.userPlaceholderImageUrl;
    // console.log(this.profileImg, 'last', this.userImageUrl, 'first');
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.liked = !this.liked;
    if (this.userId && this.postUrl) {
      const toggleLike$ = this.liked
        ? this.userService.likePost(this.userId, this.postId)
        : this.userService.unlikePost(this.userId, this.postId);

      toggleLike$.pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (response) => {
          this.userLikes = response.data?.count ?? this.userLikes;
        },
        error: (error) => {
          console.error('Error toggling post:', error);
        },
      });
    }
  }
  toggleTagHandler(event: Event) {
    event.stopPropagation();
    this.tagged = !this.tagged;
    if (this.userId && this.postUrl) {
      if (this.tagged) {
        this.userService.tagPost(this.userId, this.postId).subscribe({
          next: () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Post saved',
              showConfirmButton: false,
              timer: 1500, // Duration in milliseconds
              toast: true, // Enable toast mode
            });
          },
          error: (error: Error) => {
            console.error('Error tagging post:', error);
          },
        });
      } else {
        this.userService.untagPost(this.userId, this.postId).subscribe({
          next: () => {
            console.log('Post untagged successfully');
          },
          error: (error: Error) => {
            console.error('Error untagging post:', error);
          },
        });
      }
    }
  }
  toggleReportHandler($event: Event) {
    this.reported = !this.reported;
    if (this.userId && this.postUrl) {
      if (this.reported) {
        this.openReportDialog();
      }
    }
  }
  openReportDialog() {
    const dialogRef = this.dialog.open(ReportModalComponent, {
      height: '30%',
      width: '30%',
      data: { postId: this.postId, userId: this.userId },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        console.log('reported');
      });
  }

  toggleCommentModal(event: Event) {
    this.commentModal = !this.commentModal;
  }

  userCommentUpdate(commentCount: number) {
    this.userComments = commentCount;
    console.log('comment updated', this.userComments);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
