import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { createGroupAction, deleteGroupAction, loadGroupsAction } from '../../store/groups/groups.actions';
import { Observable} from 'rxjs';
import { GroupsProps } from '../../models/groups';
import { groupsSelector, isGroupsLoadinSelector } from '../../store/groups/groups.selectors';
import { CountdownService } from '../../services/countdown.service';
import { ModalService } from '@core/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';

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

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    private modalService: ModalService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupsComponent>,
    private dialogService: DialogService
    ) {
    this.groupsData$ = this.store.pipe(select(groupsSelector));
  }

  openModal(modalTemplate: TemplateRef<unknown>): void {
    this.modalService
      .open(modalTemplate, { title: 'Create Group' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  ngOnInit(): void {
    this.subscribeToGroupsData();
    this.initValues();
    this.initForm();
  }

  initForm(): void {
    this.groupCreateForm = this.fb.group({
      name: [
        'Liza',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        ],
      ],
    });
  }

  initValues(): void {
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.isGroupsLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
  }

  loadData(): void {
    // this.store.dispatch(loadGroupsAction());
  }

  createGroup(): void {
    const name: string = this.groupCreateForm.get('name')?.value;
    const userId = this.currentUserId || '';
    this.store.dispatch(createGroupAction({ name, userId }));
  }

  updateGroupsList(): void {
    this.loadData();
    this.countdownService.handleGroupsCoutdown();
  }

  subscribeToGroupsData(): void {
    this.groupsData$.subscribe((groupData) => {
      if (!groupData) {
        this.loadData();
      }
    });
  }

  onDeleteGroup(id: string):void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this group?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.store.dispatch(deleteGroupAction({groupID: id}));
      }
    });
  }

  onDialogClose(): void {
    this.dialogRef.close();
  }

}
