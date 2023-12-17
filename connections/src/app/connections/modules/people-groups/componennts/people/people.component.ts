import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersProps } from '../../models/users';
import { Store, select } from '@ngrx/store';
import { isUsersLoadinSelector, usersSelector } from '../../store/users/users.selectors';
import { CountdownService } from '../../services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { loadUsersAction } from '../../store/users/users.actions';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  usersData$: Observable<UsersProps | null>;
  isUsersLoading$!: Observable<boolean>;
  currentUserId?: string;

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
  }

  loadUsers(): void {
    const { currentUserId = '' } = this;
    this.store.dispatch(loadUsersAction({ currentUserId}));
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
