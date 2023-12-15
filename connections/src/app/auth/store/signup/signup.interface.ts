import { AuthError } from "@shared/types/user";

export interface SignUpStateInterface {
  isSubmitting: boolean;
  validationsError: AuthError | null;
  email: string;
}
