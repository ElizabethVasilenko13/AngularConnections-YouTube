import { AuthError } from '@shared/types/user.interaces';

export interface SignUpStateInterface {
  isSubmitting: boolean;
  validationsError: AuthError | null;
  email: string;
}
