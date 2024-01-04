import { Component, Input } from '@angular/core';
import { UserProps } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent {
  @Input() messages$!: UserProps['messages'];
  @Input() currentUserID!: string;
  usersData$ = this.usersService.usersData$;
  constructor (protected usersService: UsersService) {}
}
