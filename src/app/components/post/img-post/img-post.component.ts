import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-img-post',
  standalone: true,
  imports: [CommonModule, PostCommentsComponent, RouterModule],
  templateUrl: './img-post.component.html',
  styleUrl: './img-post.component.css',
})
export class ImgPostComponent implements OnInit {
  @Input() userName!: string;
  @Input() userLocation!: string;
  @Input() userImageUrl!: string;
  @Input() userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  @Input() postUrl!: string;
  @Input() userLikes!: number;
  @Input() userId: string | undefined;
  @Input() postId!: string;
  @Input() liked: boolean = false;
  @Input() commentModal: boolean = false;
  @Input() postUser!: string;
  @Input() profileImg!: string;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.profileImg = this.userImageUrl ? this.userImageUrl : this.userPlaceholderImageUrl;
    console.log(this.profileImg, 'last', this.userImageUrl, 'first');
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.liked = !this.liked;
    if (this.userId && this.postUrl) {
      if (this.liked) {
        this.userService.likePost(this.userId, this.postId).subscribe({
          next: (response) => {
            this.userLikes = response.data?.count ?? this.userLikes;
          },
          error: (error) => {
            console.error('Error liking post:', error);
          },
        });
      } else {
        this.userService.unlikePost(this.userId, this.postId).subscribe({
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
  toggleCommentModal(event: Event) {
    this.commentModal = !this.commentModal;
  }
}
