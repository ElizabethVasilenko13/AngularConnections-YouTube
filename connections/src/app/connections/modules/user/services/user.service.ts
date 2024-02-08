import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserProfileFormInterface } from 'src/app/connections/models/user.interfaces';
import { isUserLoadinSgelector, userSelector } from '../store/user.selectors';
import { LogoutAction, UpdateUserNameAction, loadUserAction } from '../store/user.actions';

@Injectable()
export class UserService {
  userProfileData$: Observable<UserProfileFormInterface | null> = this.store.pipe(
    select(userSelector),
  );
  isUserLoading$: Observable<boolean> = this.store.pipe(select(isUserLoadinSgelector));
  userProfileForm!: FormGroup;
  originalFormValues: UserProfileFormInterface | null = null;
  isEditMode$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.userProfileForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      email: [''],
      uid: [''],
      createdAt: [''],
    });
  }

  enterEditMode(): void {
    this.changeEditModeValue(true);
    this.originalFormValues = { ...this.userProfileForm.value };
  }

  changeEditModeValue(value: boolean): void {
    this.isEditMode$.next(value);
  }

  subscribeToUserProfileData(): void {
    const userDataSubscr = this.userProfileData$.subscribe((userData) => {
      if (!userData) {
        this.loadUserData();
      }
      userData && this.userProfileForm.setValue(userData);
    });

    this.subscriptions.push(userDataSubscr);
  }

  loadUserData(): void {
    this.store.dispatch(loadUserAction());
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }

  cancelEdit(): void {
    this.changeEditModeValue(false);
    this.originalFormValues && this.userProfileForm.setValue(this.originalFormValues);
  }

  saveChanges(): void {
    this.changeEditModeValue(false);
    const newName = this.userProfileForm.get('name')?.value;
    if (newName !== this.originalFormValues?.name) {
      this.store.dispatch(UpdateUserNameAction({ name: newName }));
    }
  }
}
