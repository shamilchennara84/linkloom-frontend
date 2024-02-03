import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IApiProfileRes, IApiUserRes, IApiUsersRes, IUsersAndCount } from '../models/interfaces/users';
import { IApiRes } from '../models/interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(page: number, limit: number, searchQuery: string): Observable<IApiRes<IUsersAndCount | null>> {
    return this.http.get<IApiRes<IUsersAndCount | null>>(
      `admin/users?page=${page}&limit=${limit}&searchQuery=${searchQuery}`
    );
  }

  blockUser(userId: string): Observable<IApiUserRes> {
    return this.http.patch<IApiUserRes>(`admin/users/block/${userId}`, {});
  }

  getBlockedUsers(): Observable<IApiUsersRes> {
    return this.http.get<IApiUsersRes>('admin/users?blocked=true');
  }

  getActiveUsers(): Observable<IApiUsersRes> {
    return this.http.get<IApiUsersRes>('admin/users?blocked=false');
  }

  getUserDetails(userId: string): Observable<IApiUserRes> {
    return this.http.get<IApiUserRes>(`user/get/${userId}`);
  }
  getUserProfile(userId: string): Observable<IApiProfileRes> {
    return this.http.get<IApiProfileRes>(`user/getProfile/${userId}`);
  }
}
