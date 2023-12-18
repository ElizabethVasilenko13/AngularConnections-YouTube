import { AuthError } from "@shared/types/user";
import { GroupMessagesProps } from "../../models/group-dialog";

export interface GroupDialogStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  messages: GroupMessagesProps | null;
  loadedGroupIds: string[] | null;
}