import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, Output, TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() customClass = '';
  @Input() buttonTemplate?: TemplateRef<unknown>;

  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: MouseEvent): void {
    event.preventDefault();
    this.buttonClick.emit(event);
  }
}
