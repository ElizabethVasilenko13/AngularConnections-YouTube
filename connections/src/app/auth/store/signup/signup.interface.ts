import { UserAuthError } from "../../models/auth";

export interface SignUpStateInterface {
  isSubmitting: boolean;
  validationsError: UserAuthError | null;
  email: string;
}
