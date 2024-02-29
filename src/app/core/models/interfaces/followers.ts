import { FollowingStatus } from '../enums/follow';

export interface IFollowCountRes {
  count: number;
  status: FollowingStatus;
}

export interface IFollowStatus {
  status: FollowingStatus;
}

export interface IUserSearchItem{
  _id:string,
  username:string,
  userfname:string,
  profilePic:string
  followers:number,
  isFollowing:boolean
}