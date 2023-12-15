import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error while saving data', e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      return null;
    }
  }

  clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
