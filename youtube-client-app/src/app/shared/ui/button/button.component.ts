import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonComponent {
  @Input() name: string | undefined;
  @Input() className: string | undefined;
  @Input() iconPath: string | undefined;
  @Input() type: string | undefined;

  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() buttonSubmit: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: MouseEvent) {
    event.preventDefault();
    this.buttonClick.emit(event);
  }

  onSubmit(event: Event) {
    this.buttonSubmit.emit(event);
  }
}
