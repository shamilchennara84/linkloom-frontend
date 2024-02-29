import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserService } from '../../../core/services/user.service';
import { Observable, Subject, combineLatest, map, startWith, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser, IUserChatSearch } from '../../../core/models/interfaces/users';
import { ChatServiceService } from '../../../core/services/chat-service.service';
import { IConversation, IConversationListItem } from '../../../core/models/interfaces/conversation';
import { IApiRes } from '../../../core/models/interfaces/common';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    ConversationListComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  searchControl = new FormControl('');
  alluser$!: Observable<IUserChatSearch[] | null>;
  filtered$!: Observable<IUserChatSearch[] | undefined>;
  @Output() conversationEmitter = new EventEmitter<IConversation | null>();
  allConversationItems: IConversationListItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private chatService: ChatServiceService,
    private socket: SocketService
  ) {
    this.socket.conversationsStatus$.pipe(takeUntil(this.destroy$)).subscribe((data: IConversationListItem[]) => {
      console.log('Received new conversation items:', data);
      data.forEach((item) => this.allConversationItems.push(item));
    });

    
  }
  
  ngOnInit() {
    this.alluser$ = this.userService.getAllfollowedUsers().pipe(map((response) => response.data));
    
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        tap((searchString) => console.log('searchControl valueChanges emitted:', searchString))
      )
      .subscribe();

    this.filtered$ = combineLatest([this.alluser$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([users, searchString]) => {
        console.log('Filtering users:', users, 'with search string:', searchString);
        return (
          users?.filter((u) => u && u.fullname.toLowerCase().includes((searchString ?? '').toLowerCase())) || undefined
        );
      })
    );
  }

  getConversation(otherUser: IUserChatSearch) {
    console.log('Loading conversation for user:', otherUser._id);
    this.chatService.getConversation(otherUser._id).subscribe((response: IApiRes<IConversation | null>) => {
      console.log('Conversation loaded:', response.data);
      const conversation = response.data;
      const index = this.allConversationItems.findIndex((item) => item._id === conversation?._id);

      if (index !== -1) {
        this.allConversationItems[index].unreadCount = 0;
      }
      console.log('emmiting conversation', conversation);
      this.conversationEmitter.emit(conversation);
    });
  }

  selectConversation(conversation: IConversation) {
    const index = this.allConversationItems.findIndex((item) => item._id === conversation?._id);

    if (index !== -1) {
      this.allConversationItems[index].unreadCount = 0;
    }
    console.log('emmiting conversation', conversation);
    this.conversationEmitter.emit(conversation);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
