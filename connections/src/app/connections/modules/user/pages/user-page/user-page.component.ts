import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  isUserLoading$ = this.userService.isUserLoading$;
  constructor(protected userService: UserService) {}
}
