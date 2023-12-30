import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createConversationAction } from '../store/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private store: Store, private router: Router,) { }

  toConversationPage(conversationID: string | null | undefined, companionID: string): void{
    if (conversationID) {
      this.router.navigate([`conversation/${conversationID}`]);
    } else {
      this.store.dispatch(createConversationAction({companion: companionID}))
    }
  }
}
