export interface GroupMessagesResponse {
  Count: string;
  Items: MessageItem[];
}

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
