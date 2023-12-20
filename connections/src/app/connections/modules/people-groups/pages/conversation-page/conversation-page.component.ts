import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ConverastionMessagesProps } from '../../models/conversation';
import { Observable, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { backendConverationsErrorSelector, conversationMessagesSelector, isConversationLoadinSelector, loadedConverationsIdsSelector } from '../../store/conversation/conversation.selectors';
import { loadConversationMessagesAction } from '../../store/conversation/conversation.actions';
import { ConversationService } from '../../services/conversation.service';
import { UsersProps } from '../../models/users';
import { usersSelector } from '../../store/users/users.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthError } from '@shared/types/user';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {
  conversationData$: Observable<ConverastionMessagesProps | null>;
  conversationsIds$!: Observable<string[] | null>;
  isConversationLoading$!: Observable<boolean>;
  usersData$!: Observable<UsersProps | null>;
  createMessageForm!: FormGroup;
  backendErrors$!: Observable<AuthError | null>;

  converastionId = '';
  currentUserId = '';
  constructor( 
    public countdownService: CountdownService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private store: Store,
    private fb: FormBuilder,
    private service: ConversationService,
    public dialogRef: MatDialogRef<ConversationPageComponent>,
    private dialogService: DialogService,
    ){
      this.conversationData$ = this.store.pipe(select(conversationMessagesSelector));
      this.conversationsIds$ = this.store.pipe(select(loadedConverationsIdsSelector));
      this.usersData$ = this.store.pipe(select(usersSelector));

    }

    sendMessage(): void {
      const message: string = this.createMessageForm.get('text')?.value;
      const props = {
        converastionID: this.converastionId,
        message
      }
      // this.store.dispatch(postNewMessageAction(props));
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

  updateConversation(): void {
    this.loadAllMessages()
    this.isConversationLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('conversation' + this.converastionId, 60);
          }
        })
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.subscribeToConversationData();
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
    this.isConversationLoading$ = this.store.pipe(select(isConversationLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendConverationsErrorSelector));

  }

  loadAllMessages():void {
    this.store.dispatch(loadConversationMessagesAction({ conversationID: this.converastionId }))
  }

  subscribeToConversationData(): void {

    this.conversationsIds$?.subscribe((ids) => {
      if (!ids?.includes(this.converastionId)) {
        this.loadAllMessages()
      }
    })
  }
}
