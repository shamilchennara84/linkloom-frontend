import { IUserRes } from './users';

export interface ICommentSchema {
  postId: string;
  userId: string;
  text: string;
  createdAt: Date;
}
export interface ICommentRes {
  _id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: Date;
  user: IUserRes;
}
