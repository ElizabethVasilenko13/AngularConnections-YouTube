import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  loadConversationMessagesAction,
  loadConversationMessagesSinceAction,
} from '../store/users/users.actions';
import { Observable, Subscription, take } from 'rxjs';
import {
  conversationBackendSelector,
  isConversationLoadinSelector,
} from '../store/users/users.selectors';
import { AuthError } from '@shared/types/user.interaces';
import { CountdownService } from '@core/services/countdown.service';
import { UserProps } from '../models/users';

@Injectable()
export class ConversationPageService {
  isConversationsLoading$: Observable<boolean> = this.store.pipe(
    select(isConversationLoadinSelector),
  );
  backendErrors$: Observable<AuthError | null> = this.store.pipe(
    select(conversationBackendSelector),
  );
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store,
    private countdownService: CountdownService,
  ) {}

  loadAllMessages(conversationID: string): void {
    this.store.dispatch(loadConversationMessagesAction({ conversationID }));
  }

  loadMessagesSince(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    conversationData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastUpdated)
        this.store.dispatch(
          loadConversationMessagesSinceAction({
            conversationID,
            time: value.lastUpdated,
          }),
        );
    });
  }

  subscribeToConversationData(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    const conversationsDataSubscr = conversationData$?.subscribe((data) => {
      if (data && !data.messages) {
        this.loadAllMessages(conversationID);
      }
    });

    this.subscriptions.push(conversationsDataSubscr);
  }

  updateConversation(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    this.loadMessagesSince(conversationID, conversationData$);
    const isConversationLoadingSubscr = this.isConversationsLoading$.subscribe(
      (value) => {
        if (!value) {
          this.backendErrors$.subscribe((error) => {
            if (!error) {
              this.countdownService.handleCountdown(
                'conversation' + conversationID,
                60,
              );
            }
          });
        }
      },
    );
    this.subscriptions.push(isConversationLoadingSubscr);
  }
}
