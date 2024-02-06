import { Pipe, PipeTransform } from '@angular/core';
import { UsersProps } from '../models/users';

@Pipe({
  name: 'userNameTransform',
})
export class UserNameTransformPipe implements PipeTransform {
  transform(authorID: string, usersList: UsersProps | null): string {
    if (!usersList) {
      return 'Unknown User';
    }
    const user = usersList.items.find((user) => user.uid === authorID);
    return user ? user.name: 'Me';
  }
}
