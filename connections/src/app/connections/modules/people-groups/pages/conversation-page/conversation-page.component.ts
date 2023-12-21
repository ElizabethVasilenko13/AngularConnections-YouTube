import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ConverastionMessagesProps } from '../../models/conversation';
import { Observable, Subscription, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { backendConverationsErrorSelector, conversationMessagesSelector, isConversationLoadinSelector, loadedConverationsIdsSelector } from '../../store/conversation/conversation.selectors';
import { postConversationMessageAction } from '../../store/conversation/conversation.actions';
import { ConversationService } from '../../services/conversation.service';
import { UserProps, UsersProps } from '../../models/users';
import { isUsersLoadinSelector, selectConversationById, usersSelector } from '../../store/users/users.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthError } from '@shared/types/user';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { loadConversationMessagesAction, loadUsersAction } from '../../store/users/users.actions';

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
  currentUserId = '';

  constructor(
    public countdownService: CountdownService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
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
      this.store.dispatch(postConversationMessageAction({conversationID: this.converastionId, message}));
      this.createMessageForm.reset();
    }


    onDeleteConversation(converastionID: string):void {
      this.dialogService.openConfirmDialog('Are you sure you want to delete this conversation?')
      .afterClosed().subscribe(res =>{
        if(res){
          // this.store.dispatch(deleteGroupAction({ groupID: groupId, redirect: true }));
        }
      });
    }


  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.subscribeToConversationData();
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
        this.loadAllMessages()
      }
    });

    this.subscriptions.push(usersDataSubscr);
  }

  loadUsers(): void {
    const { currentUserId = '' } = this;
    this.store.dispatch(loadUsersAction({ currentUserId}));
    // this.loadConversations()
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
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.conversationData$ = this.store.pipe(select(selectConversationById(this.converastionId)));
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    this.isConversationsLoading$ = this.store.pipe(select(isConversationLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendConverationsErrorSelector));

  }

  loadAllMessages():void {
    this.store.dispatch(loadConversationMessagesAction({conversationID: this.converastionId}))
  }

  subscribeToConversationData(): void {

    // const conversationsIdsSubscr = this.conversationsIds$?.subscribe((ids) => {
    //   if (!ids?.includes(this.converastionId)) {
    //     this.loadAllMessages()
    //   }
    // })
    const conversationsIdsSubscr = this.isUsersLoading$.subscribe((val) => {
      if (!val) {
        // this.loadAllMessages()
        this.isConversationsLoading$.subscribe((val) => {
          if(!val) {
            this.loadAllMessages()
          }
        })
        // this.loadAllMessages()
      }
    })
    this.subscriptions.push(conversationsIdsSubscr)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateConversation(): void {
    this.loadAllMessages()
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
}
