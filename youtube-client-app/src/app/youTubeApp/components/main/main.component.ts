import { Component, OnInit } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/models/search-item.model';
import { IYouTubeApiResponse } from 'src/app/models/search-response.model';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  videos: IYouTubeApiItem[] = [];
  isSortingVisible = false;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharingService.videos$.subscribe((videos) => {
      this.videos = videos;
      console.log(this.videos);
    });

    this.dataSharingService.isSortingVisible$.subscribe((isVisible) => {
      this.isSortingVisible = isVisible;
    });
  }
}
