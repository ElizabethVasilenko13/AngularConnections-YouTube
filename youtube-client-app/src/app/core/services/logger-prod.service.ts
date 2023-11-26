import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerProdService extends LoggerService {
  logMessage(message: string): void {
    console.log(`[PROD]: ${message}`);
  }
}
