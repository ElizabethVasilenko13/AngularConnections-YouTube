export interface GroupMessagesResponse {
  Count: string;
  Items: MessageItem[];
}

export interface GroupMessagesProps {
  groupID: string;
  count: string;
  items: MessageItem[];
  lastUpdated?: number;
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