import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  createConversationAction,
  deleteConversationAction,
  loadUsersAction,
} from '../store/users/users.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { ConversationPageComponent } from '../pages/conversation-page/conversation-page.component';
import { DialogService } from '@core/services/dialog.service';
import { Observable, Subscription } from 'rxjs';
import { UserProps, UsersProps } from '../models/users';
import { AuthError } from '@shared/types/user.interaces';
import { usersSelector, isUsersLoadinSelector, usersBackendSelector } from '../store/users/users.selectors';
import { AuthService } from '@core/services/auth.service';
import { CountdownService } from '@core/services/countdown.service';

@Injectable()
export class UsersService {
  usersData$: Observable<UsersProps | null> = this.store.pipe(select(usersSelector));
  isUsersLoading$: Observable<boolean> = this.store.pipe(select(isUsersLoadinSelector));
  backendUsersListErrors$: Observable<AuthError | null> = this.store.pipe(select(usersBackendSelector));
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
    public dialogRef: MatDialogRef<ConversationPageComponent>,
    private dialogService: DialogService,
    private authService: AuthService,
    public countdownService: CountdownService,
  ) {}

  toConversationPage(
    conversationID: string | null | undefined,
    companionID: string,
  ): void {
    if (conversationID) {
      this.router.navigate([`conversation/${conversationID}`]);
    } else {
      this.store.dispatch(createConversationAction({ companion: companionID }));
    }
  }

  onDeleteConversation(conversationID: string): void {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this conversation?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(
            deleteConversationAction({ conversationID, redirect: true }),
          );
        }
      });
  }

  loadUsers(): void {
    const currentUserId = this.authService.currentUserID;
    this.store.dispatch(loadUsersAction({ currentUserId }));
  }

  updateUsersList(): void {
    this.loadUsers();
    const isUsersLoadingSubscr = this.isUsersLoading$.subscribe((value) => {
      if (!value) {
        this.backendUsersListErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('users', 60);
          }
        });
      }
    });

    this.subscriptions.push(isUsersLoadingSubscr);
  }

  isConversationID(user: UserProps): boolean {
    return !!user.conversatonID;
  }
}
