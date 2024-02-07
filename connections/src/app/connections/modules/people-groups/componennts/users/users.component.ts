import { Component, Input } from '@angular/core';
import { GroupProps } from '../../models/groups';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() groups!: undefined | GroupProps[];
  @Input() isGroupLoading!: boolean | null;

  constructor(protected usersService: UsersService) {}

}
