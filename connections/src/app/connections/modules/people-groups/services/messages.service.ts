import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Action, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { UserProps } from '../models/users';
import { GroupProps } from '../models/groups';
import { postConversationMessageAction } from '../store/users/users.actions';
import { postNewMessageAction } from '../store/groups/groups.actions';
interface LastUpdatedData {
  lastUpdated?: number | null | undefined;
}
@Injectable()
export class MessagesService {
  createMessageForm = this.fb.group({
    text: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  resetMessageForm(): void {
    this.createMessageForm.reset();
  }

  private sendMessageCommon<T extends LastUpdatedData>(
    targetID: string,
    data$: Observable<T | null>,
    createAction: (options: {
      targetID: string;
      message: string;
      time: number;
    }) => Action,
  ): void {
    const message = this.createMessageForm.get('text')?.value || '';
    data$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastUpdated) {
        this.store.dispatch(
          createAction({
            targetID,
            message,
            time: value.lastUpdated,
          }),
        );
      }
    });
    this.resetMessageForm();
  }

  public sendMessageForConversation(
    conversationID: string,
    conversationData$: Observable<UserProps | null>,
  ): void {
    this.sendMessageCommon<UserProps>(
      conversationID,
      conversationData$,
      (options) =>
        postConversationMessageAction({
          conversationID: options.targetID,
          message: options.message,
          time: options.time,
        }),
    );
  }

  public sendMessageForGroup(
    groupID: string,
    groupDialogData$: Observable<GroupProps | null>,
  ): void {
    this.sendMessageCommon<GroupProps>(groupID, groupDialogData$, (options) =>
      postNewMessageAction({
        groupID: options.targetID,
        message: options.message,
        time: options.time,
      }),
    );
  }
}
