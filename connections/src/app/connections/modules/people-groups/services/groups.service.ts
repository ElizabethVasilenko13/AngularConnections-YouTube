import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GroupsComponent } from '../componennts/groups/groups.component';
import { DialogService } from '@core/services/dialog.service';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteGroupAction } from '../store/groups/groups.actions';
import { GroupPageComponent } from '../pages/group-page/group-page.component';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupCreateForm!: FormGroup;
  createMessageForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private dialog: MatDialog,
    public dialogRef: MatDialogRef<GroupsComponent | GroupPageComponent>,
    private dialogService: DialogService,) { }

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

  initMessageForm():void {
    this.createMessageForm = this.fb.group({
      text: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  resetMessageForm(): void {
    this.createMessageForm.reset();
  }

  onCreateGroup(template: TemplateRef<unknown>): void {
    this.groupCreateForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    this.dialog.open(template,dialogConfig);
  }

  onDeleteGroup(event: Event, groupID: string, redirect?: boolean):void {
    event.stopPropagation();
    this.dialogService.openConfirmDialog('Are you sure you want to delete this group?')
    .afterClosed().pipe(take(1)).subscribe(res =>{
      if(res){
        this.store.dispatch(deleteGroupAction({ groupID , redirect}));
      }
    });
  }
}
