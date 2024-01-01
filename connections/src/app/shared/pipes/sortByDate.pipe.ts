import { Pipe, PipeTransform } from '@angular/core';
import { MessageItem } from 'src/app/connections/modules/people-groups/models/group-dialog';

@Pipe({
  name: 'sortByDate',
})
export class SortByDate implements PipeTransform {
  transform(messages: MessageItem[] | undefined): MessageItem[] | null {
    if (messages)
      return messages.slice().sort((a, b) => +a.createdAt.S - +b.createdAt.S);
    return null;
  }
}
