import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IVideosResponse, IYouTubeApiResponse } from '@shared/models/search-response.model';
import { IYouTubeApiItemResponse, IYouTubeItem } from '@shared/models/search-item.model';
import { deleteVideo } from '@redux/actions/videos.actions';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  searchTerm$ = new BehaviorSubject<string>('');
  BASE_URL = 'https://www.googleapis.com/youtube/v3/';
  LIMIT = 20;

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  deleteCustomCard(index: number): void {
    this.store.dispatch(deleteVideo({ videoId: index }));
  }

  getVideos(pageToken?: string): Observable<IVideosResponse> {
    let searchParams = new HttpParams()
      .set('maxResults', this.LIMIT)
      .set('q', this.searchTerm$.value)
      .set('part', 'snippet');
    const videoParams = new HttpParams().set('part', 'statistics,snippet');

    if (pageToken) {
      searchParams = searchParams.set('pageToken', pageToken);
    }

    return this.http.get<IYouTubeApiResponse>(`${this.BASE_URL}search`, { params: searchParams }).pipe(
      switchMap((response: IYouTubeApiResponse) => {
        const pageInfo = {
            nextPageToken: response.nextPageToken,
            prevPageToken: response.prevPageToken,
        };
        const idsArray: string[] = (response.items || []).map((item) => item.id.videoId);
        const videoIds = idsArray.join(',');
        if (!videoIds) return of({ allVideos: [], pageInfo: {} });
        return this.http.get<IYouTubeApiItemResponse>(`${this.BASE_URL}videos?id=${videoIds}`, { params: videoParams }).pipe(
          map((videoResponse: IYouTubeApiItemResponse) => ({ allVideos: videoResponse.items || [], pageInfo })),
          catchError((error: Error) => {
            console.error('Error fetching video details:', error);
            return of({ allVideos: [], pageInfo: {} });
          }),
        );
      }),
      catchError((error: Error) => {
        console.error('Error fetching search results:', error);
        return of({ allVideos: [], pageInfo: {} });
      }),
    );
  }

  getVideoInfo(id: string): Observable<IYouTubeItem> {
    const videoParams = new HttpParams().set('part', 'statistics,snippet');
    return this.http.get<IYouTubeApiItemResponse>(`${this.BASE_URL}videos?id=${id}`, { params: videoParams }).pipe(
      map((response) => response.items[0] || []),
      catchError((error: Error) => {
        console.error('Error fetching video:', error);
        return of();
      }),
    );
  }
}
