import { AuthError } from "@shared/types/user";
import { UsersProps } from "../../models/users";

export interface UsersStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  users: UsersProps | null;
}