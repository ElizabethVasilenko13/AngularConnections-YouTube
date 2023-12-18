import { Component, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupMessagesProps } from '../../models/group-dialog';
import { backendGroupDialogErrorSelector, groupMessagesAuthorsIdsSelector, groupMessagesSelector, isGroupDialogLoadinSelector, loadedGroupsIdsSelector } from '../../store/group-dialog/group-dialog.selectors';
import { loadGroupMessagesAction } from '../../store/group-dialog/group-dialog.actions';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthError } from '@shared/types/user';
import { GroupsProps } from '../../models/groups';
import { groupsIdsSelector, groupsSelector } from '../../store/groups/groups.selectors';
import { deleteGroupAction, loadGroupsAction } from '../../store/groups/groups.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupsComponent } from '../../componennts/groups/groups.component';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  groupDialogData$: Observable<GroupMessagesProps | null>;
  groupsData$: Observable<GroupsProps | null>;
  isGroupDialogLoading$!: Observable<boolean>;
  groupId = '';
  isGroupCreatedByCurrnetUser = false;
  currentUserId!: string;
  groupAuthorsIds$!: Observable<string[] | undefined>;
  backendErrors$!: Observable<AuthError | null>;
  groupsIds$!: Observable<string[] | null>;

  constructor(private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<GroupsComponent>,
    private dialogService: DialogService,) {
      this.groupDialogData$ = this.store.pipe(select(groupMessagesSelector));
      this.groupsData$ = this.store.pipe(select(groupsSelector));
  }

  ngOnInit(): void {
    this.initValues();
    this.subscribeToGroupDialogData();
    this.subscribeToGroupsData();
  }

  subscribeToGroupsData(): void {
    this.groupsData$.subscribe((groupData) => {
      if (!groupData) {
        this.loadGroups();
      }
      const currentGroup = groupData?.items.find((group) => group.id.S === this.groupId);
      if(currentGroup) {
        if(currentGroup.createdBy.S === this.currentUserId)
        this.isGroupCreatedByCurrnetUser = true;
      }
    });
  }

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }

  initValues(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') as string;
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.groupsIds$ = this.store.pipe(select(loadedGroupsIdsSelector));
    this.isGroupDialogLoading$ = this.store.pipe(select(isGroupDialogLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendGroupDialogErrorSelector));
  }

  updateGroupDialog(): void {
    this.loadAllMessages()
    this.isGroupDialogLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('groupDailog', 60);
          }
        })
      }
    });
  }

  loadAllMessages(): void {
    this.store.dispatch(loadGroupMessagesAction({ groupID: this.groupId }))
  }

  onDeleteGroup(groupId: string):void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this group?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.store.dispatch(deleteGroupAction({ groupID: groupId, redirect: true }));
      }
    });
  }

  subscribeToGroupDialogData(): void {
    this.groupsIds$?.subscribe((ids) => {
      if (!ids?.includes(this.groupId)) {
        this.loadAllMessages()
      }
    })
  }
}
