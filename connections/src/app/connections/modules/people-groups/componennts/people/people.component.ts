import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { ConversationsProps, UsersProps } from '../../models/users';
import { Store, select } from '@ngrx/store';
import { isUsersLoadinSelector, usersBackendSelector, usersSelector } from '../../store/users/users.selectors';
import { CountdownService } from '../../../../../core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { createConversationAction, loadConversationsAction, loadUsersAction } from '../../store/users/users.actions';
import { Router } from '@angular/router';
import { AuthError } from '@shared/types/user.interaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  usersData$: Observable<UsersProps | null>;
  isUsersLoading$!: Observable<boolean>;
  currentUserId?: string;
  activeConversations$!: Observable<ConversationsProps | null>
  companionsIDs$!: Observable<string[] | undefined>;
  backendErrors$!: Observable<AuthError | null>
  isPageCliked = false;
  subscriptions: Subscription[] = [];

  constructor(private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private router: Router,
    ) {
    this.usersData$ = this.store.pipe(select(usersSelector));
  }

  ngOnInit(): void {
    this.initValues();
    this.subscribeToUsersData();
  }

  initValues(): void {
    this.currentUserId = this.localStorageService.get('userData')?.uid;
    this.isUsersLoading$ = this.store.pipe(select(isUsersLoadinSelector));
    // this.activeConversations$ = this.store.pipe(select(conversationsSelector));
    // this.companionsIDs$ = this.store.pipe(select(companionsIDsSelector));
    this.backendErrors$ = this.store.pipe(select(usersBackendSelector));
  }

  loadUsers(): void {
    const { currentUserId = '' } = this;
    this.store.dispatch(loadUsersAction({ currentUserId}));
    // this.loadConversations()
  }

  loadConversations(): void {
    // this.store.dispatch(loadConversationsAction());
  }

  subscribeToUsersData(): void {
    const usersDataSubscr =  this.usersData$.pipe(take(1)).subscribe((usersData) => {
      if (!usersData) {
        this.loadUsers();
      }
    });

    this.subscriptions.push(usersDataSubscr);
  }

  toConversationPage(conversationID: string | null | undefined, companionID: string): void{
    this.isPageCliked = true;
    if (conversationID && this.isPageCliked) {
      this.router.navigate([`conversation/${conversationID}`]);
      this.isPageCliked = false;
    } else {
      this.store.dispatch(createConversationAction({companion: companionID}))
    }
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
