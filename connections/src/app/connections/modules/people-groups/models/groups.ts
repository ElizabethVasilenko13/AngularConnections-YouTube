export type Group = {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
};

export interface GroupsResponse  {
  Count: string;
  Items: Group[];
}

export interface GroupsProps  {
  count: string;
  items: Group[];
}

