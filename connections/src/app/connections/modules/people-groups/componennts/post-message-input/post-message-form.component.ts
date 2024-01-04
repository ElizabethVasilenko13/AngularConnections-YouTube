import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-message-form',
  templateUrl: './post-message-form.component.html',
  styleUrls: ['./post-message-form.component.scss']
})
export class PostMessageFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() isLoading$!: Observable<boolean>;
  @Output() sendMessage = new EventEmitter<void>();

  onSendMessage(): void {
    this.sendMessage.emit();
  }
}
