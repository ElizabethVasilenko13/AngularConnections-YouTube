import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { Observable, Subscription, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createGroupAction,
  deleteGroupAction,
  loadGroupsAction,
} from '../store/groups/groups.actions';
import {
  backendGroupErrorSelector,
  groupsSelector,
  isGroupsLoadinSelector,
} from '../store/groups/groups.selectors';
import { GroupsProps } from '../models/groups';
import { AuthError } from '@shared/types/user.interaces';
import { AuthService } from '@core/services/auth.service';
import { GroupsApiService } from './groups-api.service';
import { CountdownService } from '@core/services/countdown.service';

@Injectable()
export class GroupsService {
  groupsData$: Observable<GroupsProps | null> = this.store.pipe(select(groupsSelector));
  isGroupsLoading$: Observable<boolean> = this.store.pipe(select(isGroupsLoadinSelector));
  backendGroupsErrors$: Observable<AuthError | null> = this.store.pipe(
    select(backendGroupErrorSelector),
  );
  subscriptions: Subscription[] = [];
  currentUserID = this.authService.currentUserID;
  groupCreateForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9\s\u0400-\u04FF]+$/),
      ],
    ],
  });
  count = this.countdownService;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private authService: AuthService,
    private groupApiService: GroupsApiService,
    public countdownService: CountdownService,
  ) {}

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }

  isGroupCreatedByCurrentUser(createdBy: string | undefined): boolean {
    return this.currentUserID === createdBy;
  }

  onCreateFormSubmit(): void {
    const name = this.groupCreateForm.get('name')?.value || '';
    const userId = this.authService.currentUserID;
    this.store.dispatch(createGroupAction({ name, userId }));

    const isCreateGroupModalClosedSubscr = this.groupApiService.isCreateGroupModalClosed.subscribe(
      (val) => {
        if (val === true) this.dialogService.onDialogClose();
      },
    );

    this.subscriptions.push(isCreateGroupModalClosedSubscr);
  }

  updateGroupsList(): void {
    this.loadGroups();
    const isGroupsLoadingSubscr = this.isGroupsLoading$.subscribe((value) => {
      if (!value) {
        this.backendGroupsErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('groups', 60);
          }
        });
      }
    });

    this.subscriptions.push(isGroupsLoadingSubscr);
  }

  onCreateGroup(template: TemplateRef<unknown>): void {
    this.groupCreateForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(template, dialogConfig);
  }

  onDeleteGroup(event: Event, groupID: string | undefined, redirect?: boolean): void {
    event.stopPropagation();
    const id = groupID ?? ''
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this group?')
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(deleteGroupAction({ groupID : id, redirect }));
        }
      });
  }
}
