import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiRes } from '../models/interfaces/common';
import { Observable } from 'rxjs';
import { IConversation } from '../models/interfaces/conversation';



@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  constructor(private http: HttpClient) {}

  getConversation(userId: string): Observable<IApiRes<IConversation | null>> {
    return this.http.get<IApiRes<IConversation | null>>(`user/conversation/${userId} `);
  }
  getAllConversations(): Observable<IApiRes<IConversation | null>> {
    return this.http.get<IApiRes<IConversation | null>>(`user/conversations/ `);
  }
}
