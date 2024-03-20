import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatBlankComponent } from '../chat-blank/chat-blank.component';
import { SocketService } from '../../../core/services/socket.service';
import {  Subscription } from 'rxjs';
import { IChatHistoryItem } from '../../../core/models/interfaces/chats';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IUser, IUserProfileData } from '../../../core/models/interfaces/users';
import { environment } from '../../../../environments/environment';
import { DateAgoPipe } from '../../../shared/pipes/date-ago.pipe';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, ChatBlankComponent, FormsModule, DatePipe, DateAgoPipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  @Input() conversationId!: string;
  @Input() secondUser!: string;
  @Input() user!: IUser;

  imgUrl: string = `${environment.backendUrl}images/`;
  profilePic: string = '';
  text = '';
  allMessages: IChatHistoryItem[] = [];
  secondUserDetails!: IUserProfileData;
  placeholder = 'assets/placeholder/profile.png';

  private allMessageSubscription: Subscription | undefined;
  private messageSubscription: Subscription | undefined;
  private selectedUserSubscription: Subscription | undefined;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.selectedUser$.subscribe((secondUserData) => {
      this.secondUserDetails = secondUserData;
    });
    this.socket.allMessage$.subscribe((allMessagesData) => {
      this.allMessages = allMessagesData;
      console.log(this.allMessages, 'all message reached');
    });

    this.messageSubscription = this.socket.message$.subscribe((data: IChatHistoryItem) => {
      this.allMessages.push(data);
    });
    this.profilePic = this.user && this.user.profilePic ? `${this.imgUrl}${this.user.profilePic}` : this.placeholder;
  }

  onSubmitMessage(): void {
    if (this.text.trim()) {
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
      this.allMessages.push({ ...messageData, sendersInfo: [this.user] });
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
    if (this.selectedUserSubscription) {
      this.selectedUserSubscription.unsubscribe();
    }
  }
}
