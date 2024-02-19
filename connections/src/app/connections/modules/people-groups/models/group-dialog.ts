import { MessageResp } from './conversation';

export interface GroupMessagesResponse {
  Count: string;
  Items: MessageResp[];
}

export interface MessageItem {
  authorID: string;
  message: string;
  createdAt: string;
}
