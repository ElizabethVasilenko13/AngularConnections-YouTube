import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupProps } from '../../models/groups';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss']
})
export class ElementDetailsComponent {
  @Input() group: GroupProps | undefined;
  @Input() isActive!: boolean;
  @Input() isGroupComponent = false;
  @Output() deleteGroup = new EventEmitter<string>();
  @Output() openConversation = new EventEmitter<{ groupId: string | null; companionId?: string | null }>();

  onDeleteGroup(uid: string): void {
    this.deleteGroup.emit(uid);
  }

  onGroupClick(groupId: string | null, companionId: string | null = ''): void {
    this.openConversation.emit({ groupId, companionId });
  }
}
