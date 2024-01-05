import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@core/services/auth.service';
import { loadUsersAction } from '../../modules/people-groups/store/users/users.actions';
import { loadGroupsAction } from '../../modules/people-groups/store/groups/groups.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private store: Store,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadUsers();
  }

  loadUsers(): void {
    const currentUserId = this.authService.currentUserID;
    this.store.dispatch(loadUsersAction({ currentUserId }));
  }

  loadGroups(): void {
    this.store.dispatch(loadGroupsAction());
  }
}
