import { IUserRes } from "./users";

export interface IPostReq {
  userId: string;
  postURL: string;
  caption: string;
  location: string;
  createdAt: Date;
}

export interface IPostRes extends IPostReq {
  _id: string;
}

export interface IApiPostRes {
  status: number;
  message: string;
  data: IPostRes[]
}


export interface IPostUserRes extends IPostRes {
  user: IUserRes[];
  likes: ILikeRes[];
  likeCount: number;
  commentCount: number;
  likedByCurrentUser: boolean;
  taggedByCurrentUser: boolean;
  reportedByCurrentUser: boolean;
}

export interface ILikeRes {
  _id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}
export interface ILikeCountRes {
  postId: string;
  count: number;
}
export interface IPostPerMonth {
  monthYear: string;
  count: number;
  likes: number;
  comments: number;
}

 export interface IPostPerYear {
  year: string; 
  count: number; 
  likes: number; 
  comments: number; 
}

export interface ITagSchema {
  postId: string;
  userId: string;
  createdAt: Date;
}
export interface ITagRes {
  _id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}
export interface ITaggedPost extends ITagRes {
  postDetails:IPostRes[]
}

export interface IApiSavedPost {
  status: number;
  message: string;
  data: ITaggedPost[];
}




