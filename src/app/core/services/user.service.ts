import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IApiProfileRes, IApiUserRes, IApiUsersRes, IUserUpdate, IUsersAndCount } from '../models/interfaces/users';
import { IApiRes } from '../models/interfaces/common';
import { IApiPostRes, ILikeCountRes, IPostUserRes } from '../models/interfaces/posts';
import { IFollowCountRes, IFollowStatus, IUserSearchItem } from '../models/interfaces/followers';
import { IFollowedUsers } from '../models/interfaces/chats';

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

  updateUserDetails(userId: string, userData: IUserUpdate): Observable<IApiUserRes> {
    return this.http.put<IApiUserRes>(`user/update/${userId}`, userData);
  }
  updateUserProfile(userId: string, formData: FormData): Observable<IApiUserRes> {
    return this.http.patch<IApiUserRes>(`user/update/profileimage/${userId}`, formData);
  }

  deleteUserProfile(userId: string): Observable<IApiUserRes> {
    return this.http.patch<IApiUserRes>(`user/remove/profileimage/${userId}`, {});
  }
  getUserPosts(userId: string): Observable<IApiPostRes> {
    return this.http.get<IApiPostRes>(`user/userPost/${userId}`);
  }
  getLatestPosts(userId: string): Observable<IApiRes<IPostUserRes[] | null>> {
    return this.http.get<IApiRes<IPostUserRes[] | null>>(`user/homePost/${userId}`);
  }
  likePost(userId: string, postId: string): Observable<IApiRes<ILikeCountRes | null>> {
    return this.http.get<IApiRes<ILikeCountRes | null>>(`user/like/${userId}/${postId}`);
  }
  unlikePost(userId: string, postId: string): Observable<IApiRes<ILikeCountRes | null>> {
    return this.http.get<IApiRes<ILikeCountRes | null>>(`user/Unlike/${userId}/${postId}`);
  }

  followStatus(userId: string): Observable<IApiRes<IFollowStatus | null>> {
    return this.http.get<IApiRes<IFollowStatus | null>>(`user/follow/${userId}`, {});
  }

  followRequest(userId: string, statusString: string): Observable<IApiRes<IFollowCountRes | null>> {
    return this.http.post<IApiRes<IFollowCountRes | null>>(`user/follow/${userId}`, { status: statusString });
  }

  getAllfollowedUsers(): Observable<IApiRes<IFollowedUsers | null>> {
    return this.http.get<IApiRes<IFollowedUsers | null>>('user/followedUsers');
  }

  searchUser(query:string): Observable<IApiRes<IUserSearchItem[] | null>> {
    return this.http.get<IApiRes<IUserSearchItem[] | null>>(`user/userSearch?query=${query}`);
  }
}
