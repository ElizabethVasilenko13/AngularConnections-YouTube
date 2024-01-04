import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loadConversationMessagesAction, loadConversationMessagesSinceAction, postConversationMessageAction } from '../store/users/users.actions';
import { Observable, Subscription, take } from 'rxjs';
import { conversationBackendSelector, isConversationLoadinSelector } from '../store/users/users.selectors';
import { AuthError } from '@shared/types/user.interaces';
import { CountdownService } from '@core/services/countdown.service';
import { UserProps } from '../models/users';

@Injectable()
export class ConversationPageService {
  createMessageForm  = this.fb.group({
    text: ['', [Validators.required]],
  });
  isConversationsLoading$: Observable<boolean> = this.store.pipe(
    select(isConversationLoadinSelector));
  backendErrors$: Observable<AuthError | null> = this.store.pipe(select(conversationBackendSelector));
  subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder, private store: Store, private countdownService: CountdownService) { }

  loadAllMessages(conversationID: string): void {
    this.store.dispatch(
      loadConversationMessagesAction({ conversationID }),
    );
  }

  loadMessagesSince(conversationID: string, conversationData$: Observable<UserProps | null>): void {
    conversationData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastConversationUpdated)
        this.store.dispatch(
          loadConversationMessagesSinceAction({
            conversationID,
            time: value.lastConversationUpdated,
          }),
        );
    });
  }

  subscribeToConversationData(conversationID: string, conversationData$: Observable<UserProps | null>): void {
    const conversationsDataSubscr = conversationData$?.subscribe(
      (data) => {
        if (data && !data.messages) {
          this.loadAllMessages(conversationID);
        }
      },
    );

    this.subscriptions.push(conversationsDataSubscr);
  }

  updateConversation(conversationID: string, conversationData$: Observable<UserProps | null>): void {
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

  resetMessageForm(): void {
    this.createMessageForm.reset();
  }

  sendMessage(converastionID: string, conversationData$: Observable<UserProps | null>): void {
    const message = this.createMessageForm.get('text')?.value || '';
    const conversationDataSubscr = conversationData$
        .pipe(take(1))
        .subscribe((value) => {
          if (value && value.lastConversationUpdated)
          this.store.dispatch(
            postConversationMessageAction({
              conversationID: converastionID,
              message,
              time: value.lastConversationUpdated,
            }),
          );
        });
      this.resetMessageForm();
      this.subscriptions.push(conversationDataSubscr);
  }
}
