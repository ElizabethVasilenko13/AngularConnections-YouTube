import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
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
import { UsersService } from './users.service';

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
    protected usersService: UsersService,

  ) {}

  loadMessagesSince(conversationID: string, conversationData$: Observable<UserProps | null>): void {
    conversationData$.pipe(take(1)).subscribe((value) => {
      this.store.dispatch(
        loadConversationMessagesSinceAction({
          conversationID,
          time: value?.lastUpdated || 0,
        }),
      );
    });
  }

  subscribeToConversationData(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    const conversationsDataSubscr = conversationData$?.pipe(take(1)).subscribe((data) => {
      if (!data || this.usersService.isConversationJustCreated$.value === false) {
        this.loadMessagesSince(conversationID, conversationData$);
      }
    });

    this.subscriptions.push(conversationsDataSubscr);
  }

  updateConversation(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    this.loadMessagesSince(conversationID, conversationData$);
    const isConversationLoadingSubscr = this.isConversationsLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('conversation' + conversationID, 60);
          }
        });
      }
    });
    this.subscriptions.push(isConversationLoadingSubscr);
  }
}
