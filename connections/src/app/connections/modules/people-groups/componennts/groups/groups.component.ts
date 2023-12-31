import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createGroupAction, loadGroupsAction } from '../../store/groups/groups.actions';
import { Observable, Subscription } from 'rxjs';
import { GroupsProps } from '../../models/groups';
import { backendGroupErrorSelector, groupsSelector, isGroupsLoadinSelector } from '../../store/groups/groups.selectors';
import { CountdownService } from '../../../../../core/services/countdown.service';
import { DialogService } from '@core/services/dialog.service';
import { AuthError } from '@shared/types/user.interaces';
import { AuthService } from '@core/services/auth.service';
import { GroupsApiService } from '../../services/groups-api.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  groupsData$: Observable<GroupsProps | null>;
  isGroupsLoading$!: Observable<boolean>;
  backendErrors$!: Observable<AuthError | null>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    protected authService: AuthService,
    protected dialogService: DialogService,
    private groupApiService: GroupsApiService,
    protected groupsService: GroupsService
    ) {
    this.groupsData$ = this.store.pipe(select(groupsSelector));
  }

  ngOnInit(): void {
    this.initValues();
    this.groupsService.initForm();
  }

  initValues(): void {
    this.isGroupsLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
  }

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }

  onCreateFormSubmit(): void {
    const name: string = this.groupsService.groupCreateForm.get('name')?.value;
    const userId = this.authService.currentUserID;
    this.store.dispatch(createGroupAction({ name, userId }));

    const isCreateGroupModalClosedSubscr = this.groupApiService.isCreateGroupModalClosed.subscribe((val) => {
      if (val === true) this.dialogService.onDialogClose();
    })

    this.subscriptions.push(isCreateGroupModalClosedSubscr);
  }

  updateGroupsList(): void {
    this.loadGroups();
    const isGroupsLoadingSubscr = this.isGroupsLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('groups', 60);
          }
        })
      }
    });

    this.subscriptions.push(isGroupsLoadingSubscr);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
