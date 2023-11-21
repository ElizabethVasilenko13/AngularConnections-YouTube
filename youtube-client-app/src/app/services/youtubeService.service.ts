import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IYouTubeApiResponse } from '../shared/models/search-response.model';
import { IYouTubeApiItem, IYouTubeApiItemResponse } from '../shared/models/search-item.model';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  public videoSearchTextSource$ = new BehaviorSubject<string>('');
  API_KEY = 'AIzaSyAPny5OQ8RrmhIr-N2HcH9YcxWA-ULrN58';
  BASE_URL = 'https://www.googleapis.com/youtube/v3/';
  LIMIT = 15;

  constructor(private http: HttpClient) {}

  getVideos(): Observable<IYouTubeApiItem[]> {

    const searchParams = new HttpParams()
      .set('key', this.API_KEY)
      .set('maxResults', this.LIMIT)
      .set('q', this.videoSearchTextSource$.getValue())
      .set('part', 'snippet');
    const videoParams = new HttpParams().set('key', this.API_KEY).set('part', 'statistics,snippet');

    return this.http.get<IYouTubeApiResponse>(`${this.BASE_URL}search/`, { params: searchParams }).pipe(
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

  getVideoInfo(id: string): Observable<IYouTubeApiItem> {
    const videoParams = new HttpParams().set('key', this.API_KEY).set('part', 'statistics,snippet');
    return this.http.get<IYouTubeApiItemResponse>(`${this.BASE_URL}videos?id=${id}`, { params: videoParams }).pipe(
      map((response) => response.items[0] || [])
    );
  }
}
