import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationPageComponent implements OnInit, OnDestroy {
  conversationData$!: Observable<UserProps | null>;
  isConversationsLoading$ = this.conversationPageService.isConversationsLoading$;
  backendErrors$ = this.conversationPageService.backendErrors$;
  converastionID = '';

  constructor(
    protected countdownService: CountdownService,
    private route: ActivatedRoute,
    private store: Store,
    protected conversationPageService: ConversationPageService,
    protected usersService: UsersService,
    protected messagesService: MessagesService
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
