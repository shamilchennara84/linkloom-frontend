import { IUser } from './users';

export interface IChatHistoryItem extends IChatReq {
  sendersInfo: IUser[];
}

export interface IChatReq {
  conversationId: string;
  senderId: string;
  recieverId: string;
  content: string;
  createdAt: Date;
  messageType: string;
  read: boolean;
}

export interface IChatRes extends IChatReq {
  _id: string;
}


export interface IFollowedUsers extends Array<IUser> {}
