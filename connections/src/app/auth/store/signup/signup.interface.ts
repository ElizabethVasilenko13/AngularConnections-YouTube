import { UserAuthError } from '@shared/types/user';

export interface SignUpStateInterface {
  isSubmitting: boolean;
  validationsError: UserAuthError | null;
  email: string;
}
