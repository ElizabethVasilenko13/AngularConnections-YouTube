import { Component, Input } from '@angular/core';
import { GroupProps } from '../../models/groups';
import { GroupsService } from '../../services/groups.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss']
})
export class ElementsListComponent {
  @Input() groups!: GroupProps[] | undefined;
  @Input() isGroupLoading!: boolean | null;

  constructor(
    protected groupsService: GroupsService,
    protected usersService: UsersService
  ) {}
}
