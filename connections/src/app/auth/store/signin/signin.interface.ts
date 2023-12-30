import { AuthError } from '@shared/types/user.interaces';

export interface SignInStateInterface {
  isSubmitting: boolean;
  validationsError: AuthError | null;
  email: string;
  token: string | null;
  uid: string | null;
}
