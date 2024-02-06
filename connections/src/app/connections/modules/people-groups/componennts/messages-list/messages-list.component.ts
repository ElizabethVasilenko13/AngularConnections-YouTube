import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';
import { MessageProps } from '../../models/conversation';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  @Input() messages!: MessageProps | null | undefined;
  usersData$ = this.usersService.usersData$;
  constructor(
    private usersService: UsersService,
    protected messagesService: MessagesService,
  ) {}
}
