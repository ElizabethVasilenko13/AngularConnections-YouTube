import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownService } from '@core/services/countdown.service';
import { Observable, Subscription, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserProps, UsersProps } from '../../models/users';
import {
  conversationBackendSelector,
  isConversationLoadinSelector,
  selectConversationById,
  usersSelector,
} from '../../store/users/users.selectors';
import { AuthError } from '@shared/types/user.interaces';
import {
  loadConversationMessagesAction,
  loadConversationMessagesSinceAction,
  postConversationMessageAction,
} from '../../store/users/users.actions';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
})
export class ConversationPageComponent implements OnInit, OnDestroy {
  conversationData$!: Observable<UserProps | null>;
  isConversationsLoading$!: Observable<boolean>;
  usersData$!: Observable<UsersProps | null>;
  backendErrors$!: Observable<AuthError | null>;
  subscriptions: Subscription[] = [];
  converastionID = '';

  constructor(
    public countdownService: CountdownService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private store: Store,
    protected usersService: UsersService,
  ) {
    this.usersData$ = this.store.pipe(select(usersSelector));
  }

  sendMessage(): void {
    const message: string =
      this.usersService.createMessageForm.get('text')?.value;
    this.store.dispatch(
      postConversationMessageAction({
        conversationID: this.converastionID,
        message,
        time: new Date().getTime(),
      }),
    );
    this.usersService.resetMessageForm();
  }

  ngOnInit(): void {
    this.usersService.initMessageForm();
    this.initValues();
    this.subscribeToConversationData();
  }

  initValues(): void {
    this.converastionID = this.route.snapshot.paramMap.get('id') as string;
    this.conversationData$ = this.store.pipe(
      select(selectConversationById(this.converastionID)),
    );
    this.isConversationsLoading$ = this.store.pipe(
      select(isConversationLoadinSelector),
    );
    this.backendErrors$ = this.store.pipe(select(conversationBackendSelector));
  }

  loadAllMessages(): void {
    this.store.dispatch(
      loadConversationMessagesAction({ conversationID: this.converastionID }),
    );
  }

  loadMessagesSince(): void {
    this.conversationData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastConversationUpdated)
        this.store.dispatch(
          loadConversationMessagesSinceAction({
            conversationID: this.converastionID,
            time: value.lastConversationUpdated,
          }),
        );
    });
  }

  subscribeToConversationData(): void {
    const conversationsDataSubscr = this.conversationData$?.subscribe(
      (data) => {
        if (data && !data.messages) {
          this.loadAllMessages();
        }
      },
    );

    this.subscriptions.push(conversationsDataSubscr);
  }

  updateConversation(): void {
    this.loadMessagesSince();
    const isConversationLoadingSubscr = this.isConversationsLoading$.subscribe(
      (value) => {
        if (!value) {
          this.backendErrors$.subscribe((error) => {
            if (!error) {
              this.countdownService.handleCountdown(
                'conversation' + this.converastionID,
                60,
              );
            }
          });
        }
      },
    );
    this.subscriptions.push(isConversationLoadingSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
