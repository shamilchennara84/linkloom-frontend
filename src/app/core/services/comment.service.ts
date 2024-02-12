import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentRes } from '../models/interfaces/comments';
import { IApiRes } from '../models/interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(postId:string): Observable<IApiRes<ICommentRes[] | null>> {
    return this.http.get<IApiRes<ICommentRes[] | null>>(`user/comments/${postId} `);
  }

  createComments(text: string, parentId: null | string,userId:string,postId:string): Observable<IApiRes<ICommentRes >> {
    return this.http.post<IApiRes<ICommentRes >>(`user/createcomment`, {
     text,
      parentId,
      createdAt: new Date().toISOString(),
      userId,
      postId
    });
  }
}
