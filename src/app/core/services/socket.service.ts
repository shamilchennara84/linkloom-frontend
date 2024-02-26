import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import {  IChatHistoryItem, IChatReq } from '../models/interfaces/chats';
import { IApiRes } from '../models/interfaces/common';

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

  private selectedUserNameSubject: Subject<string> = new Subject<string>();
  public slectedUserName$: Observable<string> = this.selectedUserNameSubject.asObservable();

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

    this.socket.on('receive-message', (data:IChatHistoryItem) => {
      console.log('message recieved',data);
      this.messageSubject.next(data);
    });
  }
  getChatHistory(roomId: string) {
    return this.http
      .get<IApiRes<IChatHistoryItem[] | null>>(`user/chat/history/${roomId}`, httpOptions)
      .subscribe((res) => {
        this.allMessagesSubject.next(res.data as IChatHistoryItem[]);
      });
    }
    
    sendMessage(messageData:IChatReq) {
      this.socket.emit('send-message', messageData);
    }
  // joinRoom() {
  //   this.room$.subscribe((conversationId: string) => {
  //     console.log(conversationId);
  //     this.socket.emit('join_room', conversationId);
  //   });
  // }

  socketOff() {
    this.socket.off('receive_message');
  }

  disconnect() {
    this.socket.disconnect();
  }
  // createChat(selectedUserId: string, userId: string)Observable<strign> {
  //   return this.http.get(`${this.apiUrl}/chat/${selectedUserId}/${userId}`, httpOptions).subscribe((chatId: string) => {
  //     this.roomSubject.next(chatId);
  //   });
}


// getSelctedUserName(userId: string) {
//   this.http.get(`${this.apiUrl}/users/${userId}`, httpOptions).subscribe((data: any) => {
//     this.selectedUserNameSubject.next(data.name);
//   });
// }

// }
