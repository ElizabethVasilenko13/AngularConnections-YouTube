import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupProps } from '../../../models/groups';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupItemComponent {
  @Input() group: GroupProps | undefined;
  @Input() isActive!: boolean;
  @Output() deleteGroup = new EventEmitter<string>();
  @Output() openConversation = new EventEmitter<string>();

  onDeleteGroup(uid: string): void {
    this.deleteGroup.emit(uid);
  }

  onGroupClick(): void {
    this.openConversation.emit();
  }
}
