import { IChatHistoryItem, IChatRes } from "./chats";

export interface IConversation {
  _id: string;
  members: string[];
}

export interface IConversationListItem extends IConversation {
  unreadCount: number;
  lastChat: IChatHistoryItem;
  otherMemberUsername: string;
  otherMemberProfilePic: string;
}
