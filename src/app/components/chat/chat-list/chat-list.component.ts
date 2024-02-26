import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserService } from '../../../core/services/user.service';
import { IFollowedUsers } from '../../../core/models/interfaces/chats';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/models/interfaces/users';
import { ChatServiceService } from '../../../core/services/chat-service.service';
import { IConversation } from '../../../core/models/interfaces/conversation';
import { IApiRes } from '../../../core/models/interfaces/common';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  searchControl = new FormControl('');
  alluser$!: Observable<IFollowedUsers | null>;
  filtered$!: Observable<IUser[] | undefined>;
  @Output() conversationEmitter = new EventEmitter<IConversation | null>()

  constructor(private userService: UserService, private chatService: ChatServiceService) {}

  ngOnInit() {
    this.alluser$ = this.userService.getAllfollowedUsers().pipe(map((response) => response.data));

    this.filtered$ = combineLatest([this.alluser$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([users, searchString]) =>
        users?.filter((u) => u.fullname.toLowerCase().includes((searchString ?? '').toLowerCase()))
      )
    );
  }

  getConversation(otherUser: IUser) {
    this.chatService.getConversation(otherUser._id).subscribe((response: IApiRes<IConversation | null>) => {
      const conversation = response.data;
      console.log(conversation);
      this.conversationEmitter.emit(conversation)

    });
  }


}
