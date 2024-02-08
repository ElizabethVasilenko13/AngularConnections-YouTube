import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@core/services/auth.service';
import {
  backendGroupErrorSelector,
  isGroupsLoadinSelector,
} from '../store/groups/groups.selectors';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { GroupProps } from '../models/groups';
import { loadGroupMessagesSinceAction } from '../store/groups/groups.actions';
import { CountdownService } from '@core/services/countdown.service';
import { GroupsService } from './groups.service';

@Injectable()
export class GroupPageService {
  isGroupDialogLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
  backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
  isGroupCreatedByCurrnetUser$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    protected authService: AuthService,
    public countdownService: CountdownService,
    private groupsservice: GroupsService,
  ) {}

  updateGroupDialog(groupID: string, groupDialogData$: Observable<GroupProps | null>): void {
    this.loadMessagesSince(groupID, groupDialogData$);
    const updateSubskr = this.isGroupDialogLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('groupDailog' + groupID, 60);
          }
        });
      }
    });
    this.subscriptions.push(updateSubskr);
  }

  loadMessagesSince(groupID: string, groupDialogData$: Observable<GroupProps | null>): void {
    groupDialogData$.pipe(take(1)).subscribe((value) => {
      this.store.dispatch(
        loadGroupMessagesSinceAction({
          groupID,
          time: value?.lastUpdated || 0,
        }),
      );
    });
  }

  subscribeToGroupDialogData(
    groupID: string,
    groupDialogData$: Observable<GroupProps | null>,
  ): void {
    const groupDialogDataSubscr = groupDialogData$.pipe(take(1)).subscribe((groupData) => {
      if (!groupData || this.groupsservice.isGroupJustCreated$.value === false) {
        this.loadMessagesSince(groupID, groupDialogData$);
      }

      if (groupData) {
        if (groupData.createdBy === this.authService.currentUserID) {
          this.isGroupCreatedByCurrnetUser$.next(true);
        }
      }
    });

    this.subscriptions.push(groupDialogDataSubscr);
  }
}
