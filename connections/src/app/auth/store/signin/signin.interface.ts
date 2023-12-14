import { UserAuthError } from "../../models/auth";

export interface SignInStateInterface {
  isSubmitting: boolean;
  validationsError: UserAuthError | null;
  email: string;
  token: string | null;
  uid: string | null;
}