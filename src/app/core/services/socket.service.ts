import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { IChatHistoryItem, IChatReq } from '../models/interfaces/chats';
import { IApiRes } from '../models/interfaces/common';
import { IConversationListItem } from '../models/interfaces/conversation';
import { IApiUserRes, IUserProfileData } from '../models/interfaces/users';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: Socket;

  backendUrl = environment.backendUrl;
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // private roomSubject: Subject<string> = new Subject<string>();
  // public room$: Observable<string> = this.roomSubject.asObservable();

  private allMessagesSubject: Subject<IChatHistoryItem[]> = new Subject<IChatHistoryItem[]>();
  public allMessage$: Observable<IChatHistoryItem[]> = this.allMessagesSubject.asObservable();

  private messageSubject: Subject<any> = new Subject<any>();
  public message$: Observable<any> = this.messageSubject.asObservable();

  private selectedUserSubject: Subject<IUserProfileData> = new Subject<IUserProfileData>();
  public selectedUser$: Observable<IUserProfileData> = this.selectedUserSubject.asObservable();

  private conversationsStatusSubject: Subject<IConversationListItem[]> = new Subject<IConversationListItem[]>();
  public conversationsStatus$: Observable<IConversationListItem[]> = this.conversationsStatusSubject.asObservable();

  setupSocketConnection(userId: String) {
    this.socket = io(this.backendUrl, {
      query: {
        userId: userId,
      },
    });

    this.socket.on('connect', () => {
      console.log('Successfully connected to the socket server');
    });
    this.socket.on('connect_error', (error) => {
      console.error('Error connecting to the socket server:', error);
    });

    this.socket.on('receive-message', (data: IChatHistoryItem) => {
      console.log('message recieved', data);
      this.messageSubject.next(data);
    });
  }

  allConversationHistory() {
    return this.http
      .get<IApiRes<IConversationListItem[] | null>>(`user/conversations`, httpOptions)
      .subscribe((res) => {
        this.conversationsStatusSubject.next(res.data as IConversationListItem[]);
      });
  }

  getChatHistory(roomId: string) {
    return this.http
      .get<IApiRes<IChatHistoryItem[] | null>>(`user/chat/history/${roomId}`, httpOptions)
      .subscribe((res) => {
        this.allMessagesSubject.next(res.data as IChatHistoryItem[]);
      });
  }

  sendMessage(messageData: IChatReq) {
    this.socket.emit('send-message', messageData);
  }

  getSelectedUserName(userId: string) {
    this.http.get<IApiUserRes>(`user/get/${userId}`, httpOptions).subscribe((res) => {
      this.selectedUserSubject.next(res.data);
    });
  }

  socketOff() {
    this.socket.off('receive_message');
  }

  disconnect() {
    this.socket.disconnect();
  }
  // joinRoom() {
  //   this.room$.subscribe((conversationId: string) => {
  //     console.log(conversationId);
  //     this.socket.emit('join_room', conversationId);
  //   });
  // }

  // createChat(selectedUserId: string, userId: string)Observable<strign> {
  //   return this.http.get(`${this.apiUrl}/chat/${selectedUserId}/${userId}`, httpOptions).subscribe((chatId: string) => {
  //     this.roomSubject.next(chatId);
  //   });
}



// }
