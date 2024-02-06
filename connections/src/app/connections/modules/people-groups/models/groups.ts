import { AuthError } from '@shared/types/user.interaces';
import { MessageItem } from './group-dialog';

export type GroupResp = {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
};

export interface GroupMessageProps {
  count: string;
  items: MessageItem[];
}

export interface GroupsResponse {
  Count: string;
  Items: GroupResp[];
}

export interface GroupApiProps {
  groupID: string;
}

export type GroupProps = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  messages?: GroupMessageProps | null;
  lastUpdated?: number | null;
  backendErrors?: AuthError | null;
};

export interface GroupsProps {
  count?: string;
  items: GroupProps[];
}
