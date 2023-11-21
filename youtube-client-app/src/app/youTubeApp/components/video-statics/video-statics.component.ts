import { Component, Input } from '@angular/core';
import { IStatistics } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-video-statics',
  templateUrl: './video-statics.component.html',
  styleUrls: ['./video-statics.component.scss'],
})
export class VideoStaticsComponent {
  @Input() statistics: IStatistics | undefined = undefined;
}
