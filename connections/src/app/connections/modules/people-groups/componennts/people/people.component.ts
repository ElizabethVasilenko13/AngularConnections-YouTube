import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  ngOnInit(): void {
    this.initValues();
  }

  isConversationID(user: UserProps): boolean {
    return !!user.conversatonID;
  }

  initValues(): void {
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    this.backendErrors$ = this.store.pipe(select(usersBackendSelector));
  }

  loadUsers(): void {
    const currentUserId = this.authService.currentUserID;
    this.store.dispatch(loadUsersAction({ currentUserId}));
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
