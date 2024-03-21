import { IAdminCardData } from './admin';
import { IChatHistoryItem, IFollowedUsers } from './chats';
import { ICommentRes } from './comments';
import { IConversation, IConversationListItem } from './conversation';

import { IFollowCountRes, IFollowStatus, IUserSearchItem } from './followers';
import { INotificationRes, INotificationWithUser } from './notification';
import { ILikeCountRes, IPostPerMonth, IPostUserRes, ITagRes } from './posts';
import { IReportRes } from './report';
import { IUserChatSearch, IUserPerMonth, IUserPerYear, IUserRes, IUsersAndCount } from './users';

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
  | IUserPerMonth[]
  | IUserPerYear[]
  | IPostPerMonth[]
  | IUserChatSearch[]
  | IAdminCardData
  | IUserSearchItem[]
  | ITagRes
  | INotificationWithUser[]
  | INotificationRes
  | IReportRes
  | null;

export interface IApiRes<T extends AllResTypes> {
  status: number;
  message: string;
  data: T;
}
