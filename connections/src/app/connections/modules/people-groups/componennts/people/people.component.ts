import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationsProps, UsersProps } from '../../models/users';
import { Store, select } from '@ngrx/store';
import { companionsIDsSelector, conversationsSelector, isUsersLoadinSelector, usersSelector } from '../../store/users/users.selectors';
import { CountdownService } from '../../services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { loadConversationsAction, loadUsersAction } from '../../store/users/users.actions';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  usersData$: Observable<UsersProps | null>;
  isUsersLoading$!: Observable<boolean>;
  currentUserId?: string;
  activeConversations$!: Observable<ConversationsProps | null>
  companionsIDs$!: Observable<string[] | undefined>

  constructor(private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService) {
    this.usersData$ = this.store.pipe(select(usersSelector));
  }

  ngOnInit(): void {
    this.initValues();
    this.subscribeToUsersData();
  }

  initValues(): void {
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    this.activeConversations$ = this.store.pipe(select(conversationsSelector));
    this.companionsIDs$ = this.store.pipe(select(companionsIDsSelector));
  }

  loadUsers(): void {
    const { currentUserId = '' } = this;
    this.store.dispatch(loadUsersAction({ currentUserId}));
    this.loadConversations()
  }

  loadConversations(): void {
    this.store.dispatch(loadConversationsAction());
  }

  subscribeToUsersData(): void {
    this.usersData$.subscribe((usersData) => {
      if (!usersData) {
        this.loadUsers();
      }
    });
  }

  updateUsersList(): void {
    this.loadUsers();

    this.isUsersLoading$.subscribe((value) => {
      if (!value) {
        this.countdownService.handleCountdown('users', 60);
      }
    });
  }
}
