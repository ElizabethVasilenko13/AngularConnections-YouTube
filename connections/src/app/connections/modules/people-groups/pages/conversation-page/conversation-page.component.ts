import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownService } from '@core/services/countdown.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserProps } from '../../models/users';
import {
  selectConversationById,
} from '../../store/users/users.selectors';
import { ConversationPageService } from '../../services/conversation-page.service';
import { UsersService } from '../../services/users.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
})
export class ConversationPageComponent implements OnInit, OnDestroy {
  conversationData$!: Observable<UserProps | null>;
  isConversationsLoading$ = this.conversationPageService.isConversationsLoading$;
  usersData$ = this.conversationPageService.usersData$;
  backendErrors$ = this.conversationPageService.backendErrors$;
  currentUserID = this.authService.currentUserID;
  converastionID = '';

  constructor(
    protected countdownService: CountdownService,
    private route: ActivatedRoute,
    private store: Store,
    protected conversationPageService: ConversationPageService,
    protected usersService: UsersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initConversationPageValues();
    this.conversationPageService.subscribeToConversationData(this.converastionID, this.conversationData$);
  }

  initConversationPageValues(): void {
    this.converastionID = this.route.snapshot.paramMap.get('id') as string;
    this.conversationData$ = this.store.pipe(
      select(selectConversationById(this.converastionID)),
    );
  }

  ngOnDestroy(): void {
    this.conversationPageService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
