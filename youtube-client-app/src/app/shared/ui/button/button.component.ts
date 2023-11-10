import { CommonModule } from '@angular/common';
import {
  Component, ContentChild, EventEmitter, Input, Output, TemplateRef,
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
  @ContentChild('buttonTemplate') buttonTemplate?: TemplateRef<unknown>;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(event: MouseEvent): void {
    event.preventDefault();
    this.buttonClick.emit();
  }
}
