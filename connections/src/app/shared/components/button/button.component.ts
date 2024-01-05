import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() customClass = '';
  @Input() buttonTemplate?: TemplateRef<unknown>;
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() title = 'button';
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
