import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class YouTubeApiService implements HttpInterceptor {

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_KEY = 'AIzaSyC_wDX6StbU5FdlNzsN-SrC5zgVo79veY8';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/';
    return next.handle(req.clone({
      url: `${BASE_URL}${req.url}`,
      setParams: {
        key: API_KEY,
      },
    }));
  }
}
