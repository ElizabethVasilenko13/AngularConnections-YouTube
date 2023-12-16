import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadGroupsAction } from '../../store/groups/groups.actions';
import { Observable} from 'rxjs';
import { GroupsProps } from '../../models/groups';
import { groupsSelector, isGroupsLoadinSelector } from '../../store/groups/groups.selectors';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupsData$: Observable<GroupsProps | null>;
  isGroupsLoading$!: Observable<boolean>;

  constructor(private store: Store, public countdownService: CountdownService) {
    this.groupsData$ = this.store.pipe(select(groupsSelector));
  }

  ngOnInit(): void {
    this.subscribeToGroupsData();
    this.initValues();
  }

  initValues(): void {
    this.isGroupsLoading$ = this.store.pipe(select(isGroupsLoadinSelector));
  }

  loadData(): void {
    // this.store.dispatch(loadGroupsAction());
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

}
