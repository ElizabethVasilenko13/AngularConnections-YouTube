import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserProfileFormInterface } from 'src/app/connections/models/user';
import { Store, select } from '@ngrx/store';
import {
  LogoutAction,
  UpdateUserNameAction,
  loadUserAction,
} from '../../store/user.actions';
import {
  isUserLoadinSgelector,
  userSelector,
} from '../../store/user.selectors';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfileData$: Observable<UserProfileFormInterface | null>;
  isUserLoading$!: Observable<boolean>;
  originalFormValues: UserProfileFormInterface | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.userProfileData$ = this.store.pipe(select(userSelector));
  }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.subscribeToUserProfileData();
  }

  initForm(): void {
    this.userProfileForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
      ],
      email: [''],
      uid: [''],
      createdAt: [''],
    });
  }

  initValues(): void {
    this.isUserLoading$ = this.store.pipe(select(isUserLoadinSgelector));
  }

  subscribeToUserProfileData(): void {
    this.userProfileData$.subscribe((userData) => {
      if (!userData) {
        this.loadData();
      }
      userData && this.userProfileForm.setValue(userData);
    });
  }

  loadData(): void {
    this.store.dispatch(loadUserAction());
  }

  enterEditMode(): void {
    this.isEditMode = true;
    this.originalFormValues = { ...this.userProfileForm.value };
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.originalFormValues &&
      this.userProfileForm.setValue(this.originalFormValues);
  }

  saveChanges(): void {
    this.isEditMode = false;
    const newName = this.userProfileForm.get('name')?.value;
    if (newName !== this.originalFormValues?.name) {
      this.store.dispatch(UpdateUserNameAction({ name: newName }));
    }
  }

  logout(): void {
    this.store.dispatch(LogoutAction());
  }
}