import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() customClass = '';
<<<<<<< HEAD
  @Input() buttonTemplate?: TemplateRef<unknown>;
=======
  @Input() type = 'button';
  @Input() disabled = false;
  @ContentChild('buttonTemplate') buttonTemplate?: TemplateRef<unknown>;
>>>>>>> 63f5001 (feat: implemtn login form validation)

  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
