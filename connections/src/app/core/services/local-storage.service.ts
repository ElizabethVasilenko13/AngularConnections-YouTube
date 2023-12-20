/* eslint-disable @typescript-eslint/explicit-function-return-type */
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

  get(key: string) {
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
