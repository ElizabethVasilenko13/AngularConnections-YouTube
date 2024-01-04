import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { Observable } from 'rxjs';
import { AuthError } from '@shared/types/user.interaces';
import { GroupProps } from '../../models/groups';
import { UsersProps } from '../../models/users';
import { AuthService } from '@core/services/auth.service';
import { GroupsService } from '../../services/groups.service';
import { GroupPageService } from '../../services/group-page.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectGroupById } from '../../store/groups/groups.selectors';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent implements OnInit, OnDestroy {
  groupDialogData$!: Observable<GroupProps | null>;
  isGroupDialogLoading$: Observable<boolean> = this.groupPageService.isGroupDialogLoading$;
  backendErrors$: Observable<AuthError | null> = this.groupPageService.backendErrors$;
  usersData$: Observable<UsersProps | null> = this.groupPageService.usersData$;
  isGroupCreatedByCurrnetUser$ = this.groupPageService.isGroupCreatedByCurrnetUser$;
  currentUserID = this.authService.currentUserID;
  groupID = '';

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    private authService: AuthService,
    protected groupsService: GroupsService,
    protected groupPageService: GroupPageService,
    private route: ActivatedRoute,
  ) {}

  initGroupPageValues(): void {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.groupDialogData$ = this.store.pipe(
      select(selectGroupById(this.groupID)),
    );
  }

  ngOnInit(): void {
    this.initGroupPageValues();
    this.groupPageService.subscribeToGroupDialogData(this.groupID,  this.groupDialogData$);
  }

  ngOnDestroy(): void {
    this.groupPageService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
