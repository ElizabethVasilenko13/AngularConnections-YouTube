import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createGroupAction, deleteGroupAction, loadGroupsAction } from '../../store/groups/groups.actions';
import { Observable, take} from 'rxjs';
import { GroupsProps } from '../../models/groups';
import { backendGroupErrorSelector, groupsSelector, isGroupsLoadinSelector } from '../../store/groups/groups.selectors';
import { CountdownService } from '../../../../../core/services/countdown.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { AuthError } from '@shared/types/user';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupsData$: Observable<GroupsProps | null>;
  isGroupsLoading$!: Observable<boolean>;
  groupCreateForm!: FormGroup;
  currentUserId?: string;
  backendErrors$!: Observable<AuthError | null>

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<GroupsComponent>,
    private dialogService: DialogService,
    private groupService: GroupsService
    ) {
    this.groupsData$ = this.store.pipe(select(groupsSelector));
  }

  ngOnInit(): void {
    this.subscribeToGroupsData();
    this.initValues();
    this.initForm();
  }

  initForm(): void {
    this.groupCreateForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9\s\u0400-\u04FF]+$/),
        ],
      ],
    });
  }

  initValues(): void {
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.isGroupsLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(backendGroupErrorSelector));
  }

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }

  onCreateGroup(template: TemplateRef<unknown>): void {
    this.groupCreateForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    this.dialog.open(template,dialogConfig);
  }

  onCreateFormSubmit(): void {
    const name: string = this.groupCreateForm.get('name')?.value;
    const userId = this.currentUserId || '';
    this.store.dispatch(createGroupAction({ name, userId }));

    this.isGroupsLoading$.subscribe((value) => {
      if (!value) {
        if (this.groupService.isCreateGroupModalClosed.getValue() === true) {
          this.onDialogClose();
        }
      }
    });
  }

  updateGroupsList(): void {
    this.loadGroups();
    this.isGroupsLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('groups', 60);
          }
        })
      }
    });
  }

  subscribeToGroupsData(): void {
    this.groupsData$.pipe(take(1)).subscribe((groupData) => {
      if (!groupData) {
        this.loadGroups();
      }
    });
  }

  onDeleteGroup(event: Event, groupId: string):void {
    event.stopPropagation();
    this.dialogService.openConfirmDialog('Are you sure you want to delete this group?')
    .afterClosed().pipe(take(1)).subscribe(res =>{
      if(res){
        this.store.dispatch(deleteGroupAction({ groupID: groupId }));
      }
    });
  }

  onDialogClose(): void {
    this.dialog.closeAll();
  }

}
