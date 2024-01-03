import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  createConversationAction,
  deleteConversationAction,
} from '../store/users/users.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConversationPageComponent } from '../pages/conversation-page/conversation-page.component';
import { DialogService } from '@core/services/dialog.service';

@Injectable()
export class UsersService {
  createMessageForm!: FormGroup;
  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConversationPageComponent>,
    private dialogService: DialogService,
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

  initMessageForm(): void {
    this.createMessageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  resetMessageForm(): void {
    this.createMessageForm.reset();
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
}
