import { MessageProps } from './conversation';

export type GroupResp = {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
};


export interface GroupsResponse {
  Count: string;
  Items: GroupResp[];
}

export interface GroupApiProps {
  groupID: string;
}

export type GroupProps = {
  uid: string;
  name: string;
  createdBy?: string;
  conversatonID?: string | null;
  messages?: MessageProps | null;
  lastUpdated?: number | null;
};

export interface GroupsProps {
  count?: string;
  items: GroupProps[];
}
