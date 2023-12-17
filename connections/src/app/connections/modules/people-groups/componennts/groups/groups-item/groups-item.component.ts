import { Component, Input } from '@angular/core';
import { Group } from '../../../models/groups';

@Component({
  selector: 'app-groups-item',
  templateUrl: './groups-item.component.html',
  styleUrls: ['./groups-item.component.scss']
})
export class GroupsItemComponent {
  @Input() group!: Group;
}
