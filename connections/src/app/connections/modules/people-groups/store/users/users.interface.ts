import { AuthError } from "@shared/types/user.interaces";
import { UsersProps } from "../../models/users";

export interface UsersStateInterface {
  isUsersLoading: boolean;
  isConverstionsLoading: boolean;
  backendUsersErrors: AuthError | null;
  backendConverstionsErrors: AuthError | null;
  users: UsersProps | null;
  loadedConversatonsIds: string[] | null;
}