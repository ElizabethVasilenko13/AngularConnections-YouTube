import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "@store/features.enum";
import { ConversationStateInterface } from "./conversation.interface";

export const conversationFeatureSelector = createFeatureSelector<ConversationStateInterface>(
  Features.Conversation,
);

export const isConversationLoadinSelector = createSelector(
  conversationFeatureSelector,
  (state: ConversationStateInterface) => state.isLoading,
);

export const conversationMessagesSelector = createSelector(
  conversationFeatureSelector,
  (state: ConversationStateInterface) => state.messages,
);

export const loadedConverationsIdsSelector = createSelector(
  conversationFeatureSelector,
  (state: ConversationStateInterface) => state.loadedConversationIds
);

export const backendConverationsErrorSelector = createSelector(
  conversationFeatureSelector,
  (state: ConversationStateInterface) => state.backendErrors,
);
