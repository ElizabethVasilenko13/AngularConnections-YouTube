import { Component, Input } from '@angular/core';
import { GroupProps } from '../../models/groups';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  @Input() groups!: GroupProps[] | undefined;
  @Input() isGroupLoading!: boolean | null;

  constructor(protected groupsService: GroupsService) {}
}
