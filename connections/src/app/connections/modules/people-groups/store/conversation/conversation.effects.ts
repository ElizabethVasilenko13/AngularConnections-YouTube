import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { ConversationService } from '../../services/conversation.service';
import { loadConversationMessagesAction, loadConversationMessagesFailedAction, loadConversationMessagesSuccessAction } from './conversation.actions';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private conversation: ConversationService,
    private snackBar: NotifyService,
  ) {}

  loadConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConversationMessagesAction),
      exhaustMap(({conversationID}) => {
        return this.conversation.loadAllMesages(conversationID).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Conversation have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadConversationMessagesSuccessAction({ conversationData : {
              conversationID,
              count: response.Count,
              items: response.Items
            } });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadConversationMessagesFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

}
