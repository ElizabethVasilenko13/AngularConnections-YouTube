import { MessageProps, MessageResp } from './conversation';
import { MessageItem } from './group-dialog';

export type User = {
  uid: { S: string };
  name: { S: string };
};

export type Conversation = {
  id: { S: string };
  companionID: { S: string };
};

export interface ConversationsResponse {
  Count: string;
  Items: Conversation[];
}

export interface CreateConversationsResponse {
  conversationID: string;
}

export interface ConverastionMessagesResponse {
  Count: string;
  Items: MessageResp[];
}

export interface ConverastionMessagesProps {
  conversationID?: string;
  count: string;
  items: MessageItem[];
}

export interface ConversationsProps {
  count: string;
  items: Conversation[];
}

export interface UsersResponse {
  Count: string;
  Items: User[];
}

export interface UserProps {
  uid: string;
  name: string;
  conversatonID?: string | null;
  messages?: MessageProps | null;
  lastUpdated?: number | null;
}

export interface UsersProps {
  count: string;
  items: UserProps[];
}
