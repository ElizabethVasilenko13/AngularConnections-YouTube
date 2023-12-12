import { UserAuthError } from "@shared/types/user";

export interface AuthStateInterface {
  isSubmitting: boolean;
  validationsError: UserAuthError | null;
}