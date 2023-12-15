export interface UserResponseInterface {
  email: {
    S: string;
  };
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface UserProfileFormInterface {
  uid: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserProfileProps {
  uid: string;
  email: string;
  token: string;
}