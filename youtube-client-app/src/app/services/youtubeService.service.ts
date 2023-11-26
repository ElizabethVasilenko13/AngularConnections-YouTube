import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IYouTubeApiResponse } from '@shared/models/search-response.model';
import { IYouTubeApiItemResponse, IYouTubeItem } from '@shared/models/search-item.model';
import { deleteVideo } from '../redux/actions/admin-page.actions';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  LIMIT = 15;
  BASE_URL = 'https://www.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient, private store: Store) {}

  deleteCard(index: number): void {
    this.store.dispatch(deleteVideo({ videoId: index }));
  }

  getVideos(searchTerm: string): Observable<IYouTubeItem[]> {
    const searchParams = new HttpParams()
      .set('maxResults', this.LIMIT)
      .set('q', searchTerm)
      .set('part', 'snippet');
    const videoParams = new HttpParams().set('part', 'statistics,snippet');

    return this.http.get<IYouTubeApiResponse>(`${this.BASE_URL}search`, { params: searchParams }).pipe(
      switchMap((response: IYouTubeApiResponse) => {
        const idsArray: string[] = (response.items || []).map((item) => item.id.videoId);
        const videoIds = idsArray.join(',');
        if (!videoIds) return of([]);
        return this.http.get<IYouTubeApiResponse>(`${this.BASE_URL}videos?id=${videoIds}`, { params: videoParams }).pipe(
          map((videoResponse: IYouTubeApiResponse) => videoResponse.items || []),
          catchError((error: Error) => {
            console.error('Error fetching video details:', error);
            return of([]);
          })
        );
      }),
      catchError((error: Error) => {
        console.error('Error fetching search results:', error);
        return of([]);
      })
    );
  }

  getVideosByIds(videoIds: string[]): Observable<IYouTubeItem[]>  {
    const videoParams = new HttpParams().set('part', 'statistics,snippet');
    return this.http.get<IYouTubeApiItemResponse>(`videos?id=${videoIds}`, { params: videoParams }).pipe(
      map((videoResponse: IYouTubeApiItemResponse) => videoResponse.items || []),
      catchError((error: Error) => {
        console.error('Error fetching video details:', error);
        return of([]);
      }),
    );
  }

  getVideoInfo(id: string): Observable<IYouTubeItem> {
    const videoParams = new HttpParams().set('part', 'statistics,snippet');
    return this.http.get<IYouTubeApiItemResponse>(`${this.BASE_URL}videos?id=${id}`, { params: videoParams }).pipe(
      map((response) => response.items[0] || [])
    );
  }
}
