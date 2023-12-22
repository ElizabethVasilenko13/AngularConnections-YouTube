import { AuthError } from "@shared/types/user";
import { ConverastionMessagesProps } from "../../models/conversation";

export interface ConversationStateInterface {
  isLoading: boolean;
  backendErrors: AuthError | null;
  messages: ConverastionMessagesProps | null;
  lastUpdated: number | null;
  loadedConversationIds: string[] | null;
}