import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { GroupsComponent } from '../componennts/groups/groups.component';
import { GroupPageComponent } from '../pages/group-page/group-page.component';
import { AuthService } from '@core/services/auth.service';
import { backendGroupErrorSelector, isGroupsLoadinSelector } from '../store/groups/groups.selectors';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { GroupProps } from '../models/groups';
import { loadGroupMessagesAction, loadGroupMessagesSinceAction } from '../store/groups/groups.actions';
import { CountdownService } from '@core/services/countdown.service';

@Injectable()
export class GroupPageService {
  isGroupDialogLoading$ = this.store.pipe(
    select(isGroupsLoadinSelector),
  );
  backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
  isGroupCreatedByCurrnetUser$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupsComponent | GroupPageComponent>,
    protected authService: AuthService,
    public countdownService: CountdownService) { }

    updateGroupDialog(groupID: string, groupDialogData$: Observable<GroupProps | null>): void {
      this.loadMessagesSince(groupID,  groupDialogData$ );
      const updateSubskr = this.isGroupDialogLoading$.subscribe((value) => {
        if (!value) {
          this.backendErrors$.subscribe((error) => {
            if (!error) {
              this.countdownService.handleCountdown(
                'groupDailog' + groupID,
                60,
              );
            }
          });
        }
      });
      this.subscriptions.push(updateSubskr);
    }

    loadMessagesSince(groupID: string, groupDialogData$: Observable<GroupProps | null>): void {
      groupDialogData$.pipe(take(1)).subscribe((value) => {
        if (value && value.lastUpdated)
          this.store.dispatch(
            loadGroupMessagesSinceAction({
              groupID,
              time: value.lastUpdated,
            }),
          );
      });
    }

    loadAllMessages(groupID: string): void {
      this.store.dispatch(loadGroupMessagesAction({ groupID }));
    }

    subscribeToGroupDialogData(groupID: string, groupDialogData$: Observable<GroupProps | null>): void {
      const groupDialogDataSubscr = groupDialogData$.subscribe(
        (groupData) => {
          if (groupData) {
            if (groupData.createdBy.S === this.authService.currentUserID) {
              this.isGroupCreatedByCurrnetUser$.next(true);
            }
            if (!groupData.messages) {
              this.loadAllMessages(groupID);
            }
          }
        },
      );

      this.subscriptions.push(groupDialogDataSubscr);
    }
}
