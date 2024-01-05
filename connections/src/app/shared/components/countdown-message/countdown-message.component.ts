import { Component, Input } from '@angular/core';
import { CountdownService } from '@core/services/countdown.service';

@Component({
  selector: 'app-countdown-message',
  templateUrl: './countdown-message.component.html',
  styleUrls: ['./countdown-message.component.scss'],
})
export class CountdownMessageComponent {
  @Input() identifier = '';
  constructor(public countdownService: CountdownService) {}
}
