import { Component, Input } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-img-post',
  standalone: true,
  imports: [],
  templateUrl: './img-post.component.html',
  styleUrl: './img-post.component.css',
})
export class ImgPostComponent {
  @Input() userName!: string;
  @Input() userLocation!: string;
  @Input() userImageUrl!: string;
  @Input() userPlaceholderImageUrl: string =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200';
  @Input() postUrl!: string;
  @Input() userLikes!: number;
  @Input() userId: string | undefined;
  @Input() postId!: string;
  @Input() liked: boolean = false;

  constructor(private userService: UserService) {}

  toggleLike(event: MouseEvent) {
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
}
