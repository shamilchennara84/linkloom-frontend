import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import {
  IApiProfileRes,
  IApiUserRes,
  IApiUsersRes,
  IUserChatSearch,
  IUserPerMonth,
  IUserPerYear,
  IUserUpdate,
  IUsersAndCount,
} from '../models/interfaces/users';
import { IApiRes } from '../models/interfaces/common';
import { IApiPostRes, IApiSavedPost, ILikeCountRes, IPostPerMonth, IPostPerYear, IPostUserRes, ITagRes } from '../models/interfaces/posts';
import { IFollowCountRes, IFollowStatus, IUserSearchItem } from '../models/interfaces/followers';

import { IAdminCardData } from '../models/interfaces/admin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //admin services

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

  getNewActiveUsersPerMonth(): Observable<IApiRes<IUserPerMonth[]>> {
    return this.http.get<IApiRes<IUserPerMonth[]>>(`admin/newuserpermonth`);
  }

  getNewActiveUsersPerYear(): Observable<IApiRes<IUserPerYear[] | null>> {
    return this.http.get<IApiRes<IUserPerYear[]>>(`admin/newuserperyear`);
  }

  getPostsPerMonth(): Observable<IApiRes<IPostPerMonth[] | null>> {
    return this.http.get<IApiRes<IPostPerMonth[]>>(`admin/postpermonth`);
  }
  getPostsPerYear(): Observable<IApiRes<IPostPerYear[] | null>> {
    return this.http.get<IApiRes<IPostPerYear[]>>(`admin/postperyear`);
  }
  getAdminCardData(): Observable<IApiRes<IAdminCardData | null>> {
    return this.http.get<IApiRes<IAdminCardData | null>>('admin/admincards');
  }

  //users service
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

  getUserSavedPosts(userId: string): Observable<IApiSavedPost> {
    return this.http.get<IApiSavedPost>(`user/usersavedPost/${userId}`);
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

  tagPost(userId: string, postId: string): Observable<IApiRes<ITagRes | null>> {
    return this.http.get<IApiRes<ITagRes | null>>(`user/tag/${userId}/${postId}`);
  }
  untagPost(userId: string, postId: string): Observable<IApiRes<ITagRes | null>> {
    return this.http.get<IApiRes<ITagRes | null>>(`user/Untag/${userId}/${postId}`);
  }

  followStatus(userId: string): Observable<IApiRes<IFollowStatus | null>> {
    return this.http.get<IApiRes<IFollowStatus | null>>(`user/follow/${userId}`, {});
  }

  followRequest(userId: string, statusString: string): Observable<IApiRes<IFollowCountRes | null>> {
    return this.http.post<IApiRes<IFollowCountRes | null>>(`user/follow/${userId}`, { status: statusString });
  }

  getAllfollowedUsers(): Observable<IApiRes<IUserChatSearch[] | null>> {
    return this.http.get<IApiRes<IUserChatSearch[] | null>>('user/followedUsers');
  }

  searchUser(query: string): Observable<IApiRes<IUserSearchItem[] | null>> {
    return this.http.get<IApiRes<IUserSearchItem[] | null>>(`user/userSearch?query=${query}`);
  }
}
