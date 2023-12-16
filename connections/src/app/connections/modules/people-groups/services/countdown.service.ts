import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  groupsCountdown$ = new BehaviorSubject<number>(0);
  timerSubscription: Subscription | undefined;

  setCountdown(value: number): void {
    this.groupsCountdown$.next(value);
  }

  getGroupsCountdownValue(): number {
    return this.groupsCountdown$.getValue();
  }

  handleGroupsCoutdown(): void {
    const humanReadableTimerTime = 60;
    const machineTimerTime = 1000;

    this.setCountdown(humanReadableTimerTime);
    this.timerSubscription = timer(0, machineTimerTime).subscribe(() => {
      const currentCountdown = this.groupsCountdown$.getValue();
      if (currentCountdown > 0) {
        this.setCountdown(currentCountdown - 1);
      } else {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
      }
    });
  }

  isGroupsCountdownEnded(): boolean {
    return this.getGroupsCountdownValue() > 0 ? false : true;
  }
}
