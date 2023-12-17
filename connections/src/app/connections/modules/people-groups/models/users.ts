export type User = {
  uid: { S: string };
  name: { S: string };
};

export type Conversation = {
  id: { S: string };
  companionID: { S: string };
};

export interface ConversationsResponse  {
  Count: string;
  Items: Conversation[];
}

export interface CreateConversationsResponse  {
  conversationID: string;
}


export interface ConversationsProps  {
  count: string;
  items: Conversation[];
}

export interface UsersResponse  {
  Count: string;
  Items: User[];
}

export interface UsersProps  {
  count: string;
  items: User[];
}