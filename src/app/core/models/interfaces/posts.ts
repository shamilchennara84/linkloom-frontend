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
  likedByCurrentUser: boolean;
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