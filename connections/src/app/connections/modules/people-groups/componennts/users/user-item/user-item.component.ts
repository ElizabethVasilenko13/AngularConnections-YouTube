import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupProps } from '../../../models/groups';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() group: GroupProps | undefined;
  @Input() isActive!: boolean;
  @Output() openConversation = new EventEmitter<string>();

  onGroupClick(): void {
    this.openConversation.emit();
  }
}
