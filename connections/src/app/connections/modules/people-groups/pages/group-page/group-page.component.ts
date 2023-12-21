import { Component, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Store, select } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthError } from '@shared/types/user';
import { GroupProps, GroupsProps } from '../../models/groups';
import { backendGroupErrorSelector, groupsSelector, isGroupsLoadinSelector, loadedGroupsIdsSelector, selectGroupById } from '../../store/groups/groups.selectors';
import { deleteGroupAction, loadGroupMessagesAction, loadGroupMessagesSinceAction, loadGroupsAction, postNewMessageAction } from '../../store/groups/groups.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { UsersProps } from '../../models/users';
import { isUsersLoadinSelector, usersSelector } from '../../store/users/users.selectors';
import { loadConversationsAction, loadUsersAction } from '../../store/users/users.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  groupDialogData$!: Observable<GroupProps | null>;
  groupsData$: Observable<GroupsProps | null>;
  isGroupDialogLoading$!: Observable<boolean>;
  isUsersDataLoading$!: Observable<boolean>;
  groupId = '';
  isGroupCreatedByCurrnetUser = false;
  currentUserId!: string;
  groupAuthorsIds$!: Observable<string[] | undefined>;
  backendErrors$!: Observable<AuthError | null>;
  groupsIds$!: Observable<string[] | null>;
  usersData$!: Observable<UsersProps | null>;
  messageCreatorId = '';
  messageCreatorName = '';
  createMessageForm!: FormGroup;

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<GroupPageComponent>,
    private dialogService: DialogService,
    private fb: FormBuilder,
    ) {
      this.groupsData$ = this.store.pipe(select(groupsSelector));
      this.usersData$ = this.store.pipe(select(usersSelector));
  }

  sendMessage(): void {
    const message: string = this.createMessageForm.get('text')?.value;
    this.groupDialogData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastUpdated) this.store.dispatch(postNewMessageAction({groupID: this.groupId, message, time: value.lastUpdated}))
    })
    this.createMessageForm.reset();
  }

  getMessageCreatorName(authorId: string): Observable<string> {
    return this.usersData$.pipe(
      map(usersData => {
        const user = usersData?.items.find(user => user.uid.S === authorId);
        return user?.name.S || 'Me';
      })
    );
  }

  ngOnInit(): void {
    this.initValues();
    this.initForm();
    this.subscribeToGroupsData();
    this.subscribeToUsersData();
  }

  initForm():void {
    this.createMessageForm = this.fb.group({
      text: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  subscribeToGroupsData(): void {
    this.groupsData$.subscribe((groupData) => {
      if (!groupData) {
        this.loadGroups();
      }

      if (groupData) {
        this.subscribeToGroupDialogData()
      }
  })

  }

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }

  initValues(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') as string;
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.groupDialogData$ = this.store.pipe(select(selectGroupById(this.groupId)));
    this.groupsIds$ = this.store.pipe(select(loadedGroupsIdsSelector));
    this.isGroupDialogLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
    this.isUsersDataLoading$ = this.store.pipe(select(isUsersLoadinSelector));
  }

  updateGroupDialog(): void {
    this.loadMessagesSince();
    this.isGroupDialogLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          console.log(error);
          
          if (!error) {
            this.countdownService.handleCountdown('groupDailog' + this.groupId, 60);
          }
        })
      }
    });
  }

  loadMessagesSince(): void {
    this.groupDialogData$.pipe(take(1)).subscribe((value) => {
      if (value && value.lastUpdated) this.store.dispatch(loadGroupMessagesSinceAction({groupID: this.groupId, time: value.lastUpdated}))
    })
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

  loadUsers(): void {
    const { currentUserId = '' } = this;
    this.store.dispatch(loadUsersAction({ currentUserId}));
    this.loadConversations()
  }

  loadConversations(): void {
    this.store.dispatch(loadConversationsAction());
  }

  subscribeToUsersData(): void {
    this.usersData$.subscribe((usersData) => {
      if (!usersData) {
        this.loadUsers();
      }
    });
  }

  subscribeToGroupDialogData(): void {
    this.groupsIds$?.pipe(take(1)).subscribe((ids) => {
      if (!ids?.includes(this.groupId)) {
        this.loadAllMessages()
      }
    })

    this.groupDialogData$.subscribe((groupData) => {
      if (groupData) {
        if (groupData.createdBy.S === this.currentUserId) {
          this.isGroupCreatedByCurrnetUser = true;
        }
      }
    })
  }
}
