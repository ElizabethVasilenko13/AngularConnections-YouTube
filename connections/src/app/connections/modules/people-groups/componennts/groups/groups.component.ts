import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { Store, select } from '@ngrx/store';
import { loadGroupsAction } from '../../store/groups/groups.actions';
import { Observable } from 'rxjs';
import { GroupsProps } from '../../models/groups';
import { groupsSelector, isGroupsLoadinSelector } from '../../store/groups/groups.selectors';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupsData$: Observable<GroupsProps | null>;
  isGroupsLoading$!: Observable<boolean>;
  constructor(private groups: GroupsService, private store: Store) {
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

  subscribeToGroupsData(): void {
    this.groupsData$.subscribe((groupData) => {
      if (!groupData) {
        this.loadData();
      }
    });
  }

}
