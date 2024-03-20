import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
import { ChatMessageComponent } from '../../chat/chat-message/chat-message.component';
import { ChatListComponent } from '../../chat/chat-list/chat-list.component';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { IUser, IUserRes } from '../../../core/models/interfaces/users';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { IConversation } from '../../../core/models/interfaces/conversation';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-user-chatroom',
  standalone: true,
  imports: [UserLayoutComponent, ChatMessageComponent, ChatListComponent, CommonModule, FontAwesomeModule],
  templateUrl: './user-chatroom.component.html',
  styleUrl: './user-chatroom.component.css',
})
export class UserChatroomComponent implements OnInit {
  faUsers = faUsers;
  user!:IUser
  secondUser!:string
  userProfile$!: Observable<IUserRes | null>;
  followedUsers$!: Observable<IUserRes[]>;
  conversationId: string | undefined;

  constructor( private store: Store,private socketService:SocketService) {}
  
  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserDetails));
    this.userProfile$.subscribe((userProfile) => {
      if (userProfile) {
        // this.socketService.setupSocketConnection(userProfile._id);
        this.user = userProfile
      }
    });
    this.socketService.allConversationHistory();
  }
  
  handleConversation(conversation: IConversation | null) {
    if (conversation) {
      this.secondUser = conversation.members.filter((x)=>x!==this.user._id)[0]
      this.socketService.getChatHistory(conversation._id);
      this.socketService.getSelectedUserName(this.secondUser);
      this.conversationId = conversation._id;
    } 
  }



  // ngOnDestroy(): void {
  //   this.socketService.socketOff();
  //   this.socketService.disconnect();
  // }
}
