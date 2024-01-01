import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdowns: Map<string, BehaviorSubject<number>> = new Map<
    string,
    BehaviorSubject<number>
  >();
  private timerSubscriptions: Map<string, Subscription> = new Map<
    string,
    Subscription
  >();

  setCountdown(key: string, value: number): void {
    if (!this.countdowns.has(key)) {
      this.countdowns.set(key, new BehaviorSubject<number>(0));
    }
    this.countdowns.get(key)?.next(value);
  }

  getCountdownValue(key: string): number {
    const countdown = this.countdowns.get(key);
    return countdown ? countdown.getValue() : 0;
  }

  handleCountdown(key: string, duration: number): void {
    if (!this.countdowns.has(key)) {
      this.countdowns.set(key, new BehaviorSubject<number>(0));
    }

    if (this.timerSubscriptions.has(key)) {
      this.timerSubscriptions.get(key)?.unsubscribe();
    }

    this.setCountdown(key, duration);

    this.timerSubscriptions.set(
      key,
      timer(0, 1000).subscribe(() => {
        const currentCountdown = this.getCountdownValue(key);
        if (currentCountdown > 0) {
          this.setCountdown(key, currentCountdown - 1);
        } else {
          this.timerSubscriptions.get(key)?.unsubscribe();
        }
      }),
    );
  }

  isCountdownEnded(key: string): boolean {
    return this.getCountdownValue(key) > 0 ? false : true;
  }

  stopAllCountdowns(): void {
    this.timerSubscriptions.forEach((subscription, key) => {
      subscription.unsubscribe();
      this.countdowns.get(key)?.next(0);
    });

    this.timerSubscriptions.clear();
  }
}
