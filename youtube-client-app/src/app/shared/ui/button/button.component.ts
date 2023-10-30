import {
  Component, EventEmitter, Input, Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() name: string | undefined;
  @Input() className: string | undefined;
  @Input() iconPath: string | undefined;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(event: MouseEvent) {
    event.preventDefault();
    this.buttonClick.emit();
  }
}
