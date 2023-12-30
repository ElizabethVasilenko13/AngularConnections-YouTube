import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { UserProps, UsersProps } from '../../models/users';
import { Store, select } from '@ngrx/store';
import { isUsersLoadinSelector, usersBackendSelector, usersSelector } from '../../store/users/users.selectors';
import { loadUsersAction } from '../../store/users/users.actions';
import { AuthError } from '@shared/types/user.interaces';
import { AuthService } from '@core/services/auth.service';
import { CountdownService } from '@core/services/countdown.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  usersData$: Observable<UsersProps | null>;
  isUsersLoading$!: Observable<boolean>;
  backendErrors$!: Observable<AuthError | null>
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public countdownService: CountdownService,
    protected authService: AuthService,
    protected usersService: UsersService
    ) {
    this.usersData$ = this.store.pipe(select(usersSelector));
  }

  isConversationID(user: UserProps): boolean {
    return !!user.conversatonID;
  }

  ngOnInit(): void {
    this.initValues();
    this.subscribeToUsersData();
  }

  initValues(): void {
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(usersBackendSelector));
  }

  loadUsers(): void {
    const currentUserId = this.authService.currentUserID;
    this.store.dispatch(loadUsersAction({ currentUserId}));
  }

  subscribeToUsersData(): void {
    const usersDataSubscr =  this.usersData$.pipe(take(1)).subscribe((usersData) => {
      if (!usersData) {
        this.loadUsers();
      }
    });

    this.subscriptions.push(usersDataSubscr);
  }

  updateUsersList(): void {
    this.loadUsers();
    const isUsersLoadingSubscr = this.isUsersLoading$.subscribe((value) => {
      if (!value) {
        this.backendErrors$.subscribe((error) => {
          if (!error) {
            this.countdownService.handleCountdown('users', 60)
          }
        })
      }
    });

    this.subscriptions.push(isUsersLoadingSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
