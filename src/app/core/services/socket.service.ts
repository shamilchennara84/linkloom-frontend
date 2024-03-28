import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { IChatHistoryItem, IChatReq } from '../models/interfaces/chats';
import { IApiRes } from '../models/interfaces/common';
import { IConversationListItem } from '../models/interfaces/conversation';
import { IApiUserRes, IUserProfileData } from '../models/interfaces/users';
import { INotification, INotificationRes, INotificationWithUser } from '../models/interfaces/notification';

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

  private allMessagesSubject: BehaviorSubject<IChatHistoryItem[]> = new BehaviorSubject<IChatHistoryItem[]>([]);
  public allMessage$: Observable<IChatHistoryItem[]> = this.allMessagesSubject.asObservable();

  private messageSubject: Subject<IChatHistoryItem> = new Subject<IChatHistoryItem>();
  public message$: Observable<IChatHistoryItem> = this.messageSubject.asObservable();

  private selectedUserSubject: Subject<IUserProfileData> = new Subject<IUserProfileData>();
  public selectedUser$: Observable<IUserProfileData> = this.selectedUserSubject.asObservable();

  private conversationsStatusSubject: Subject<IConversationListItem[]> = new Subject<IConversationListItem[]>();
  public conversationsStatus$: Observable<IConversationListItem[]> = this.conversationsStatusSubject.asObservable();

  private newMessagesBlankSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public newMessagesBlank$: Observable<boolean> = this.newMessagesBlankSubject.asObservable();

  //notification section
  private allNotificationSubject: Subject<INotificationWithUser[]> = new Subject<INotificationWithUser[]>();
  public allNotifications$: Observable<INotificationWithUser[]> = this.allNotificationSubject.asObservable();

  private notificationSubject: Subject<INotificationWithUser> = new Subject<INotificationWithUser>();
  public notifications$: Observable<INotificationWithUser> = this.notificationSubject.asObservable();

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
      console.log('message received', data);
      this.messageSubject.next(data);
    });

    this.socket.on('receive-notification', (data: INotificationWithUser) => {
      console.log('notification received', data);
      this.notificationSubject.next(data);
    });
  }

  getNotifications() {
    console.log('get notification');
    this.allNotificationSubject.next([]);
    const cacheBuster = new Date().getTime();
    return this.http
      .get<IApiRes<INotificationWithUser[] | null>>(`user/notifications?${cacheBuster}`)
      .subscribe((res) => {
        console.log('Emitting notifications:', res.data); // Log the data being emitted
        this.allNotificationSubject.next(res.data as INotificationWithUser[]);
      });
  }

  allConversationHistory() {
    return this.http
      .get<IApiRes<IConversationListItem[] | null>>(`user/conversations`, httpOptions)
      .subscribe((res) => {
        this.conversationsStatusSubject.next(res.data as IConversationListItem[]);
      });
  }

  getChatHistory(roomId: string, page: number, limit: number) {
    const cacheBuster = new Date().getTime();
    this.http
      .get<IApiRes<IChatHistoryItem[] | null>>(
        `user/chat/history/${roomId}?page=${page}&limit=${limit}&${cacheBuster}`,
        httpOptions
      )
      .subscribe((res) => {
        const newMessages = res.data as IChatHistoryItem[];

        const currentMessages = this.allMessagesSubject.getValue();
        this.allMessagesSubject.next([...newMessages, ...currentMessages]);

         const areNewMessagesBlank = newMessages.length === 0;
         this.newMessagesBlankSubject.next(areNewMessagesBlank);
      });
  }

  sendMessage(messageData: IChatReq) {
    this.socket.emit('send-message', messageData);
  }

  sendNotification(notificationData: INotification) {
    console.log('notification emitting', notificationData);
    this.socket.emit('send-notification', notificationData);
  }

  getSelectedUserName(userId: string) {
    this.http.get<IApiUserRes>(`user/get/${userId}`, httpOptions).subscribe((res) => {
      this.selectedUserSubject.next(res.data);
    });
  }

  declineFollowRequest(notificationId: string) {
    return this.http.delete(`user/friendrequest/decline/${notificationId}`, httpOptions);
  }

  acceptFollowRequest(notificationId: string) {
    return this.http.patch(`user/friendrequest/accept/${notificationId}`, httpOptions);
  }
  removeNotification(notificationId: string): Observable<IApiRes<INotificationRes | null>> {
    return this.http.delete<IApiRes<INotificationRes | null>>(`user/notification/${notificationId}`, httpOptions);
  }

  socketOff() {
    this.socket.off('receive_message');
  }

  disconnect() {
    this.socket.disconnect();
  }
}
