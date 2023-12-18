import { Component, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupMessagesProps } from '../../models/group-dialog';
import { backendGroupDialogErrorSelector, groupMessagesAuthorsIdsSelector, groupMessagesSelector, isGroupDialogLoadinSelector } from '../../store/group-dialog/group-dialog.selectors';
import { loadGroupMessagesAction } from '../../store/group-dialog/group-dialog.actions';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthError } from '@shared/types/user';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  groupDialogData$: Observable<GroupMessagesProps | null>;
  isGroupDialogLoading$!: Observable<boolean>;
  groupId = '';
  currentUserId!: string;
  groupAuthorsIds$!: Observable<string[] | undefined>;
  backendErrors$!: Observable<AuthError | null>

  constructor(private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,) {
      this.groupDialogData$ = this.store.pipe(select(groupMessagesSelector));
  }

  ngOnInit(): void {
    this.initValues();
    this.subscribeToGroupDialogData();
  }

  initValues(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') as string;
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    console.log(this.currentUserId);
    // this.groupAuthorsIds$.subscribe((val) => console.log(val)
    // );
    // this.groupAuthorsIds$ = this.store.pipe(select(groupMessagesAuthorsIdsSelector));
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

  subscribeToGroupDialogData(): void {
    this.groupDialogData$.subscribe((dialog) => {
      if (!dialog) {
        this.loadAllMessages();
      }
    });
  }
}
