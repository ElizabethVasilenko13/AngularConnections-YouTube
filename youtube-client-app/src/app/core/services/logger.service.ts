import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class LoggerService {
  abstract logMessage(message: string): void
}
