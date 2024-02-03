import { Component } from '@angular/core';

import { UserLayoutComponent } from '../user-layout/user-layout.component';

@Component({
  selector: 'app-user-chatroom',
  standalone: true,
  imports: [UserLayoutComponent],
  templateUrl: './user-chatroom.component.html',
  styleUrl: './user-chatroom.component.css',
})
export class UserChatroomComponent {}
