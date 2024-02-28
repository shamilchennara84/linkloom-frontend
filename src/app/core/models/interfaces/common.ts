import { IChatHistoryItem, IFollowedUsers } from './chats';
import { ICommentRes } from './comments';
import { IConversation, IConversationListItem } from './conversation';
import { IFollowCountRes, IFollowStatus, IUserSearchItem } from './followers';
import { ILikeCountRes, IPostUserRes } from './posts';
import { IUserRes, IUsersAndCount } from './users';

export interface ICoords {
  type?: string;
  coordinates: [number, number];
}

export interface IUserAddress {
  country: string;
  state: string;
  district: string;
  city: string;
  zip: number;
}

export type AllResTypes =
  | IUserRes
  | IUserRes[]
  | IUsersAndCount
  | IPostUserRes[]
  | ILikeCountRes
  | ICommentRes
  | ICommentRes[]
  | IFollowCountRes
  | IFollowStatus
  | IFollowedUsers
  | IConversation
  | IConversationListItem[]
  | IChatHistoryItem[]
  | IUserSearchItem[]
  | null;

export interface IApiRes<T extends AllResTypes> {
  status: number;
  message: string;
  data: T;
}
