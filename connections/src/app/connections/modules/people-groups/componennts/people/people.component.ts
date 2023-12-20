import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationsProps, UsersProps } from '../../models/users';
import { Store, select } from '@ngrx/store';
import { companionsIDsSelector, conversationsSelector, isUsersLoadinSelector, usersSelector } from '../../store/users/users.selectors';
import { CountdownService } from '../../../../../core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { createConversationAction, loadConversationsAction, loadUsersAction } from '../../store/users/users.actions';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

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
  companionsIDs$!: Observable<string[] | undefined>;
  isPageCliked = false;

  constructor(private store: Store,
    public countdownService: CountdownService,
    private localStorageService: LocalStorageService,
    private users: UsersService,
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

  toConversationPage(id:string): void{
    this.isPageCliked = true;
    this.companionsIDs$.subscribe((companions) => {
      const isConversationExist = companions?.includes(id);
      if (isConversationExist && this.isPageCliked) {
        this.router.navigate([`conversation/${id}`]);
        this.isPageCliked = false;
      } else {
        this.store.dispatch(createConversationAction({companion: id}))
      }
    })
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
