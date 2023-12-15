import { AuthError } from '@shared/types/user';
import { UserProfileFormInterface } from 'src/app/connections/models/user';

export interface UserStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  userData: UserProfileFormInterface | null;
}
