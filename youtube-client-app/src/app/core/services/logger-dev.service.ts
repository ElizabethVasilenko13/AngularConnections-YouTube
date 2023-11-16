import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerDevService extends LoggerService {

  logMessage(message: string): void {
    console.log(`[DEV]: ${message}`);
  }

}
