import { Injectable, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogService } from '@core/services/dialog.service';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteGroupAction } from '../store/groups/groups.actions';

@Injectable()
export class GroupsService {
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

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {}

  onCreateGroup(template: TemplateRef<unknown>): void {
    this.groupCreateForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(template, dialogConfig);
  }

  onDeleteGroup(event: Event, groupID: string, redirect?: boolean): void {
    event.stopPropagation();
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this group?')
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(deleteGroupAction({ groupID, redirect }));
        }
      });
  }
}
