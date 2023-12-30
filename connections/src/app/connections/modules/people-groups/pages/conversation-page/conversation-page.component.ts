import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownService } from '@core/services/countdown.service';
import { Observable, Subscription, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserProps, UsersProps } from '../../models/users';
import { conversationBackendSelector, isConversationLoadinSelector, isUsersLoadinSelector, loadedConverationsIdsSelector, selectConversationById, usersSelector } from '../../store/users/users.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthError } from '@shared/types/user.interaces';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { deleteConversationAction, loadConversationMessagesAction, loadConversationMessagesSinceAction, loadUsersAction, postConversationMessageAction } from '../../store/users/users.actions';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit, OnDestroy {
  conversationData$!: Observable<UserProps | null>;
  conversationsIds$!: Observable<string[] | null>;
  isConversationsLoading$!: Observable<boolean>;
  usersData$!: Observable<UsersProps | null>;
  isUsersLoading$!: Observable<boolean>;
  createMessageForm!: FormGroup;
  backendErrors$!: Observable<AuthError | null>;
  subscriptions: Subscription[] = [];
  converastionId = '';

  constructor(
    public countdownService: CountdownService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConversationPageComponent>,
    private dialogService: DialogService,
    ){
      this.conversationsIds$ = this.store.pipe(select(loadedConverationsIdsSelector));
      this.usersData$ = this.store.pipe(select(usersSelector));

    }

    sendMessage(): void {
      const message: string = this.createMessageForm.get('text')?.value;
      this.store.dispatch(postConversationMessageAction({conversationID: this.converastionId, message, time: new Date().getTime()}));
      this.createMessageForm.reset();
    }

    onDeleteConversation(conversationID: string):void {
      this.dialogService.openConfirmDialog('Are you sure you want to delete this conversation?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.store.dispatch(deleteConversationAction({ conversationID, redirect: true }));
        }
      });
    }


  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.subscribeToUsersData();
  }

  initForm():void {
    this.createMessageForm = this.fb.group({
      text: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  subscribeToUsersData(): void {
    const usersDataSubscr =  this.usersData$.subscribe((usersData) => {
      if (!usersData) {
        this.loadUsers();
      } else {
        this.subscribeToConversationData();
      }
    });

    this.subscriptions.push(usersDataSubscr);
  }

  loadUsers(): void {
    const currentUserId  = this.authService.currentUserID;
    this.store.dispatch(loadUsersAction({ currentUserId}));
  }

  getMessageCreatorName(authorId: string): Observable<string> {
    return this.usersData$.pipe(
      map(usersData => {
        const user = usersData?.items.find(user => user.uid.S === authorId);
        return user?.name.S || 'Me';
      })
    );
  }

  initValues():void {
    this.converastionId = this.route.snapshot.paramMap.get('id') as string;
    this.conversationData$ = this.store.pipe(select(selectConversationById(this.converastionId)));
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    this.isConversationsLoading$ = this.store.pipe(select(isConversationLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(conversationBackendSelector));

  }

  loadAllMessages():void {
    this.store.dispatch(loadConversationMessagesAction({conversationID: this.converastionId}))
  }

  loadMessagesSince(): void {
    this.conversationData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastConversationUpdated) this.store.dispatch(loadConversationMessagesSinceAction({conversationID: this.converastionId, time: value.lastConversationUpdated}))
    })
  }

  subscribeToConversationData(): void {

    const conversationsDataSubscr = this.conversationData$?.pipe(take(1)).subscribe((data) => {
      this.isUsersLoading$.pipe(take(1)).subscribe((usersLoading) => {
        if (!usersLoading) {
          this.isConversationsLoading$.pipe(take(1)).subscribe((conversationLoading) => {
            if (!conversationLoading) {
              if (data && !data.messages) {
                this.loadAllMessages();
              }
            }
          })
        }
      })
    })

    this.subscriptions.push(conversationsDataSubscr)
  }

  updateConversation(): void {
    this.loadMessagesSince();
    const isConversationLoadingSubscr =  this.isConversationsLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('conversation' + this.converastionId, 60);
          }
        })
      }
    });
    this.subscriptions.push(isConversationLoadingSubscr)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
