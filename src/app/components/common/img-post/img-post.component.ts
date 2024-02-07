import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-post',
  standalone: true,
  imports: [],
  templateUrl: './img-post.component.html',
  styleUrl: './img-post.component.css'
})
export class ImgPostComponent {
@Input() userName!: string;
  @Input() userLocation!: string;
  @Input() userImageUrl!: string;
  @Input() userPlaceholderImageUrl: string = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200';
  @Input() postUrl!: string 
  @Input() userLikes!: number;

  constructor() { }
  
}


