import { Component, Input } from '@angular/core';
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
export class ConversationListComponent {
  imgUrl: string = `${environment.backendUrl}images`;
  @Input() conversation!: IConversationListItem;
}
