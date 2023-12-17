export type User = {
  uid: { S: string };
  name: { S: string };
};

export interface UsersResponse  {
  Count: string;
  Items: User[];
}

export interface UsersProps  {
  count: string;
  items: User[];
}