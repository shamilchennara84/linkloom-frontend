import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatBlankComponent } from '../chat-blank/chat-blank.component';
import { SocketService } from '../../../core/services/socket.service';
import { Subscription } from 'rxjs';
import { IChatHistoryItem } from '../../../core/models/interfaces/chats';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IUser, IUserProfileData } from '../../../core/models/interfaces/users';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, ChatBlankComponent, FormsModule, DatePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  imgUrl: string = `${environment.backendUrl}images/`;
  profilePic: string = '';
  @Input() conversationId!: string;
  @Input() secondUser!: string;
  secondUserDetails!: IUserProfileData;
  @Input() user!: IUser;
  placeholder = 'assets/placeholder/profile.png';

  text = '';
  allMessages: IChatHistoryItem[] = [];
  private allMessageSubscription: Subscription | undefined;
  private messageSubscription: Subscription | undefined;
  private selectedUserSubscription: Subscription | undefined;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.socket.selectedUser$.subscribe((data: IUserProfileData) => {
      this.secondUserDetails = data
    });

    this.allMessageSubscription = this.socket.allMessage$.subscribe((data: IChatHistoryItem[]) => {
      this.allMessages = data;

      this.messageSubscription = this.socket.message$.subscribe((data: IChatHistoryItem) => {
        this.allMessages.push(data);
      });
    });
    this.profilePic = this.user && this.user.profilePic ? `${this.imgUrl}${this.user.profilePic}` : this.placeholder;
  }

  onSubmitMessage() {
    if (!(this.text.trim() === '')) {
      const messageData = {
        conversationId: this.conversationId,
        content: this.text,
        senderId: this.user._id,
        recieverId: this.secondUser,
        messageType: 'text',
        read: false,
        createdAt: new Date(),
      };
      this.socket.sendMessage(messageData);
      const message = { ...messageData, sendersInfo: [this.user] };

      this.allMessages.push(message);
      this.text = '';
    }
  }

  ngOnDestroy(): void {
    if (this.allMessageSubscription) {
      this.allMessageSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
