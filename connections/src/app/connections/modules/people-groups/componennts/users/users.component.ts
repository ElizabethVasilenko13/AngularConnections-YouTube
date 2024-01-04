import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnDestroy {
  usersData$ = this.usersService.usersData$;
  isUsersLoading$ = this.usersService.isUsersLoading$;
  backendErrors$ = this.usersService.backendUsersListErrors$;

  constructor(
    protected countdownService: CountdownService,
    protected usersService: UsersService,
  ) {}

  ngOnDestroy(): void {
    this.usersService.subscriptions.forEach((subscription) =>
      subscription.unsubscribe(),
    );
  }
}
