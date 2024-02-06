export interface MessageResp {
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
  Items: MessageResp[];
}
