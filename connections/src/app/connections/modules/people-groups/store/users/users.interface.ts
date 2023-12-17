import { AuthError } from "@shared/types/user";
import { ConversationsProps, UsersProps } from "../../models/users";

export interface UsersStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  users: UsersProps | null;
  conversations: ConversationsProps | null;
}