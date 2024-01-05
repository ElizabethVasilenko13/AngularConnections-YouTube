import { Component, OnDestroy } from '@angular/core';
import { CountdownService } from '../../../../../core/services/countdown.service';
import { DialogService } from '@core/services/dialog.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnDestroy {
  groupsData$ = this.groupsService.groupsData$;
  isGroupsLoading$ = this.groupsService.isGroupsLoading$;
  backendErrors$ = this.groupsService.backendGroupsErrors$;

  constructor(
    protected countdownService: CountdownService,
    protected dialogService: DialogService,
    protected groupsService: GroupsService,
  ) {}

  ngOnDestroy(): void {
    this.groupsService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
