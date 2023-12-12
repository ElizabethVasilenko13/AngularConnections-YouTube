export interface UserSignUpProps {
  name: string;
  email: string;
  passwors: string;
}

export interface UserAuthError {
  type: string;
  message: string;
}