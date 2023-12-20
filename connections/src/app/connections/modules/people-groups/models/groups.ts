import { AuthError } from "@shared/types/user";
import {  MessageItem } from "./group-dialog";

export type Group = {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
};

export interface GroupMessageProps {
  count: string;
  items: MessageItem[];
}


export interface GroupsResponse  {
  Count: string;
  Items: Group[];
}

export interface GroupApiProps  {
  groupID: string;
}

export type GroupProps = {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
  messages?: GroupMessageProps | null;
  lastUpdated?: number | null;
  backendErrors?: AuthError | null;
};



export interface GroupsProps  {
  count?: string;
  items: GroupProps[];
}

