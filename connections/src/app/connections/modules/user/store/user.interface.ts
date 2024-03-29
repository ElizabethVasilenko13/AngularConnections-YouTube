import { AuthError } from '@shared/types/user.interaces';
import { UserProfileFormInterface } from 'src/app/connections/models/user.interfaces';

export interface UserStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  userData: UserProfileFormInterface | null;
}
