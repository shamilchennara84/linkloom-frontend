import { Component, OnInit } from '@angular/core';

import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { ChatMessageComponent } from '../../chat/chat-message/chat-message.component';
import { ChatListComponent } from '../../chat/chat-list/chat-list.component';


@Component({
  selector: 'app-user-chatroom',
  standalone: true,
  imports: [
    UserLayoutComponent,
    ChatMessageComponent,
    ChatListComponent,
    
  ],
  templateUrl: './user-chatroom.component.html',
  styleUrl: './user-chatroom.component.css',
})
export class UserChatroomComponent implements OnInit {

  ngOnInit(): void {}
}
