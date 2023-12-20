import { AuthError } from "@shared/types/user";
import { GroupsProps } from "../../models/groups";

export interface GroupsStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  groups: GroupsProps | null;
  loadedGroupIds: string[] | null;
}