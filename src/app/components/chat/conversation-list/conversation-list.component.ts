import { Component, Input, OnInit } from '@angular/core';
import { IConversation, IConversationListItem } from '../../../core/models/interfaces/conversation';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css',
})
export class ConversationListComponent implements OnInit {
  imgUrl: string = `${environment.imageUrl}`;
  @Input() conversation!: IConversationListItem;
  userPlaceholderImageUrl: string = 'assets/placeholder/profile.png';
  profileImg!: string;

  ngOnInit(): void {
    if(this.conversation)
    this.profileImg = this.conversation.otherMemberProfilePic ? this.imgUrl + this.conversation.otherMemberProfilePic : this.userPlaceholderImageUrl;
   
  }
}
