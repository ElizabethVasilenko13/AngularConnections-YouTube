import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import {
  createConversationAction,
  createConversationFailedAction,
  createConversationSuccessAction,
  deleteConversationAction,
  deleteConversationFailedAction,
  deleteConversationSuccessAction,
  loadConversationMessagesSinceAction,
  loadConversationMessagesSinceFailedAction,
  loadConversationMessagesSinceSuccessAction,
  loadConversationsAction,
  loadConversationsFailedAction,
  loadConversationsSuccessAction,
  loadUsersAction,
  loadUsersFailedAction,
  loadUsersSuccessAction,
  postConversationMessageAction,
  postConversationMessageFailedAction,
  postConversationMessageSuccessAction,
} from './users.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersApiService } from '../../services/users-api.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private snackBar: NotifyService,
    private usersApi: UsersApiService,
    private router: Router,
    private store: Store,
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersAction),
      switchMap(({ currentUserId }) => {
        return this.usersApi.loadUsers().pipe(
          map((response) => {
            this.snackBar.addMessage(`Users have been succesfully loaded`, NotifyStyles.Success);
            const transformedUsers = response.Items.map((user) => ({
              name: user.name.S,
              uid: user.uid.S,
            }));
            const filteredUsers = transformedUsers.filter((user) => user.uid !== currentUserId);
            this.store.dispatch(loadConversationsAction());
            return loadUsersSuccessAction({
              users: {
                count: response.Count,
                items: filteredUsers,
              },
              currentUserId,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadUsersFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConversationsAction),
      switchMap(() => {
        return this.usersApi.loadConversations().pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Conversations have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadConversationsSuccessAction({
              conversations: {
                count: response.Count,
                items: response.Items,
              },
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadConversationsFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  createConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createConversationAction),
      switchMap(({ companion }) => {
        return this.usersApi.createConversation(companion).pipe(
          map(({ conversationID }) => {
            this.snackBar.addMessage(
              `Conversation have been succesfully created`,
              NotifyStyles.Success,
            );
            this.router.navigate([`conversation/${conversationID}`]);
            return createConversationSuccessAction({
              companion,
              conversationId: conversationID,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(createConversationFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  loadConversationSince$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConversationMessagesSinceAction),
      switchMap(({ conversationID, time }) => {
        return this.usersApi.loadConversation(conversationID, time).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Last messages have been succesfully loaded`,
              NotifyStyles.Success,
            );
            const transformedConversation = response.Items.map((conversation) => ({
              authorID: conversation.authorID.S,
              message: conversation.message.S,
              createdAt: conversation.createdAt.S,
            }));
            return loadConversationMessagesSinceSuccessAction({
              conversationID,
              time: new Date().getTime(),
              conversationData: {
                count: response.Count,
                items: transformedConversation,
              },
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadConversationMessagesSinceFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  deleteConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteConversationAction),
      switchMap(({ conversationID, redirect }) => {
        return this.usersApi.deleteConversation(conversationID).pipe(
          map(() => {
            this.snackBar.addMessage(
              `Conversation have been succesfully deleted`,
              NotifyStyles.Success,
            );
            if (redirect) this.router.navigate(['/']);
            return deleteConversationSuccessAction({ conversationID });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(deleteConversationFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  postMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postConversationMessageAction),
      switchMap(({ conversationID, message, time }) => {
        return this.usersApi.postNewMessage(conversationID, message).pipe(
          map(() => {
            this.snackBar.addMessage(`Message was sent successfully`, NotifyStyles.Success);
            this.store.dispatch(loadConversationMessagesSinceAction({ conversationID, time }));
            return postConversationMessageSuccessAction();
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(postConversationMessageFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
