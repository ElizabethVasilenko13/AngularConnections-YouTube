import { Component, Input } from '@angular/core';
import { UserProps } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() user: UserProps | undefined;
  @Input() isLoading!: boolean;
  constructor(protected usersService: UsersService){}
}
