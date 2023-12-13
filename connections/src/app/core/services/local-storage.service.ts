import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch(e) {
      console.error('Error while saving data', e);
    }
  }

  get(key: string): unknown {
    try {
      return JSON.parse(localStorage.getItem(key || '') || '{}');
    } catch(e) {
      console.error('Error while getting data', e);
      return null;
    }
  }
}
