export interface MessageItem {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface ConverastionMessagesResponse {
  Count: string;
  Items: MessageItem[];
}

export interface ConverastionMessagesProps {
  conversationID?: string;
  count: string;
  items: MessageItem[];
}