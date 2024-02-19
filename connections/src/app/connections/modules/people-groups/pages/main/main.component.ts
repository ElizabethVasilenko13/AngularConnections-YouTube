import { Component, OnDestroy } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { DialogService } from '@core/services/dialog.service';
import { GroupsService } from '../../services/groups.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainPageComponent implements OnDestroy {
  groupsData$ = this.groupsService.groupsData$;
  isGroupsLoading$ = this.groupsService.isGroupsLoading$;
  usersData$ = this.usersService.usersData$;
  isUsersLoading$ = this.usersService.isUsersLoading$;

  constructor(
    protected countdownService: CountdownService,
    protected dialogService: DialogService,
    protected groupsService: GroupsService,
    protected usersService: UsersService,
  ) {}

  ngOnDestroy(): void {
    this.groupsService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
