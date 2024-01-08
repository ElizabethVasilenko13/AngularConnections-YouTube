import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '../../../models/groups';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupItemComponent {
  @Input() group: Group | undefined;
  @Input() isLoading!: boolean;
  constructor(protected groupsService: GroupsService) {}
}
