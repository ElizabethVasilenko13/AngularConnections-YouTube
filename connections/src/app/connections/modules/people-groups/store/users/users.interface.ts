import { AuthError } from "@shared/types/user";
import { UsersProps } from "../../models/users";

export interface UsersStateInterface {
  isUsersLoading: boolean;
  isConverstionsLoading: boolean;
  backendUsersErrors: AuthError | null;
  backendConverstionsErrors: AuthError | null;
  users: UsersProps | null;
  loadedConversatonsIds: string[] | null;
}