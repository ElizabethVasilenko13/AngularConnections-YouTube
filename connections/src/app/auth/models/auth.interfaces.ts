export interface UserSignUpProps {
  name: string;
  email: string;
  passwors: string;
}

export interface UserSignInProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  uid: string;
}
