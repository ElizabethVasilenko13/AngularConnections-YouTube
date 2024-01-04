import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnDestroy {
  userProfileData$ = this.userService.userProfileData$;
  isUserLoading$ = this.userService.isUserLoading$;
  isEditMode$ = this.userService.isEditMode$;
  constructor(protected userService: UserService) {}
  ngOnInit(): void {
    this.userService.subscribeToUserProfileData();
  }

  ngOnDestroy(): void {
    this.userService.subscriptions.forEach((subscription) =>
      subscription.unsubscribe(),
    );
  }
}
