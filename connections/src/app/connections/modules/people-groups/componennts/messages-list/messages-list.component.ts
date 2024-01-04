import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserProps } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  @Input() messages!: UserProps['messages'];
  usersData$ = this.usersService.usersData$;
  currentUserID = this.authService.currentUserID;
  constructor(
    protected usersService: UsersService,
    private authService: AuthService,
  ) {}
}
