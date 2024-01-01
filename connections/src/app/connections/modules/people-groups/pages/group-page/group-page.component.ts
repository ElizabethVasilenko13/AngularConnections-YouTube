import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthError } from '@shared/types/user.interaces';
import { GroupProps } from '../../models/groups';
import {
  backendGroupErrorSelector,
  isGroupsLoadinSelector,
  selectGroupById,
} from '../../store/groups/groups.selectors';
import {
  loadGroupMessagesAction,
  loadGroupMessagesSinceAction,
  postNewMessageAction,
} from '../../store/groups/groups.actions';
import { UsersProps } from '../../models/users';
import { usersSelector } from '../../store/users/users.selectors';
import { AuthService } from '@core/services/auth.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent implements OnInit, OnDestroy {
  groupDialogData$!: Observable<GroupProps | null>;
  isGroupDialogLoading$!: Observable<boolean>;
  isGroupCreatedByCurrnetUser = false;
  backendErrors$!: Observable<AuthError | null>;
  usersData$!: Observable<UsersProps | null>;
  subscriptions: Subscription[] = [];
  groupID = '';

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    protected authService: AuthService,
    private route: ActivatedRoute,
    protected groupsService: GroupsService,
  ) {
    this.usersData$ = this.store.pipe(select(usersSelector));
  }

  sendMessage(): void {
    const message: string =
      this.groupsService.createMessageForm.get('text')?.value;
    const groupDialogDataSubscr = this.groupDialogData$
      .pipe(take(1))
      .subscribe((value) => {
        if (value && value.lastUpdated)
          this.store.dispatch(
            postNewMessageAction({
              groupID: this.groupID,
              message,
              time: value.lastUpdated,
            }),
          );
      });
    this.groupsService.resetMessageForm();
    this.subscriptions.push(groupDialogDataSubscr);
  }

  ngOnInit(): void {
    this.initValues();
    this.groupsService.initMessageForm();
    this.subscribeToGroupDialogData();
  }

  initValues(): void {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.groupDialogData$ = this.store.pipe(
      select(selectGroupById(this.groupID)),
    );
    this.isGroupDialogLoading$ = this.store.pipe(
      select(isGroupsLoadinSelector),
    );
    this.backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
  }

  updateGroupDialog(): void {
    this.loadMessagesSince();
    const updateSubskr = this.isGroupDialogLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown(
              'groupDailog' + this.groupID,
              60,
            );
          }
        });
      }
    });
    this.subscriptions.push(updateSubskr);
  }

  loadMessagesSince(): void {
    this.groupDialogData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastUpdated)
        this.store.dispatch(
          loadGroupMessagesSinceAction({
            groupID: this.groupID,
            time: value.lastUpdated,
          }),
        );
    });
  }

  loadAllMessages(): void {
    this.store.dispatch(loadGroupMessagesAction({ groupID: this.groupID }));
  }

  subscribeToGroupDialogData(): void {
    const groupDialogDataSubscr = this.groupDialogData$.subscribe(
      (groupData) => {
        if (groupData) {
          if (groupData.createdBy.S === this.authService.currentUserID) {
            this.isGroupCreatedByCurrnetUser = true;
          }
          if (!groupData.messages) {
            this.loadAllMessages();
          }
        }
      },
    );

    this.subscriptions.push(groupDialogDataSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
