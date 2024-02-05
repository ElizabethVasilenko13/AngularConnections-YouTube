import { AuthError } from '@shared/types/user.interaces';
import { UsersProps } from '../../models/users';

export interface UsersStateInterface {
  isUsersLoading: boolean;
  isAllConversationsLoading: boolean;
  isConversationLoading: boolean;
  backendUsersErrors: AuthError | null;
  backendConverstionsErrors: AuthError | null;
  users: UsersProps | null;
  loadedConversatonsIds: string[] | null;
}
