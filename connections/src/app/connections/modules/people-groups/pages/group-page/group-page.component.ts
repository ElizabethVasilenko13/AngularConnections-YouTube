import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { Observable } from 'rxjs';
import { GroupProps } from '../../models/groups';
import { GroupsService } from '../../services/groups.service';
import { GroupPageService } from '../../services/group-page.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectGroupById } from '../../store/groups/groups.selectors';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent implements OnInit, OnDestroy {
  groupDialogData$!: Observable<GroupProps | null>;
  isGroupDialogLoading$ = this.groupPageService.isGroupDialogLoading$;
  backendErrors$ = this.groupPageService.backendErrors$;
  isGroupCreatedByCurrnetUser$ = this.groupPageService.isGroupCreatedByCurrnetUser$;
  groupID = '';

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    protected groupsService: GroupsService,
    protected groupPageService: GroupPageService,
    private route: ActivatedRoute,
    protected messagesService: MessagesService,
  ) {}

  initGroupPageValues(): void {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.groupDialogData$ = this.store.pipe(select(selectGroupById(this.groupID)));
  }

  ngOnInit(): void {
    this.initGroupPageValues();
    this.groupPageService.subscribeToGroupDialogData(this.groupID, this.groupDialogData$);
  }

  ngOnDestroy(): void {
    this.groupPageService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
