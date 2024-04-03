import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatBlankComponent } from '../chat-blank/chat-blank.component';
import { SocketService } from '../../../core/services/socket.service';
import { Subscription } from 'rxjs';
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
export class ChatMessageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() conversationId!: string;
  @Input() secondUser!: string;
  @Input() user!: IUser;

  imgUrl: string = `${environment.imageUrl}`;
  profilePic: string = '';
  text = '';
  allMessages: IChatHistoryItem[] = [];
  secondUserDetails!: IUserProfileData;
  placeholder = '/assets/placeholder/profile.png';

  currentPage: number = 1;
  hasMoreMessages: boolean = true;

  private allMessageSubscription: Subscription | undefined;
  private messageSubscription: Subscription | undefined;
  private selectedUserSubscription: Subscription | undefined;

  @ViewChild('chatSection', { static: false })
  chatSection!: ElementRef;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.selectedUser$.subscribe((secondUserData) => {
      this.secondUserDetails = secondUserData;
    });
    this.socketService.allMessage$.subscribe((allMessagesData) => {
      this.allMessages = allMessagesData;
      this.scrollToBottom();
      console.log(this.allMessages, 'all message reached');
    });

    this.socketService.newMessagesBlank$.subscribe((isBlank) => {
      this.hasMoreMessages = !isBlank;
    });

    this.messageSubscription = this.socketService.message$.subscribe((data: IChatHistoryItem) => {
      this.allMessages.push(data);
    });
    this.profilePic = this.user && this.user.profilePic ? `${this.imgUrl}${this.user.profilePic}` : this.placeholder;
  }

  ngAfterViewInit() {}
  scrollToBottom(): void {
    try {
      console.log('scrolling');
      this.chatSection.nativeElement.scrollTop = this.chatSection.nativeElement.scrollHeight;
    } catch (err) {}
  }

  loadMessages(page: number): void {
    this.socketService.getChatHistory(this.conversationId, page, 10);
  }

  loadMoreMessages(): void {
    this.currentPage = this.currentPage + 1;
    this.loadMessages(this.currentPage);
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
      this.socketService.sendMessage(messageData);
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
