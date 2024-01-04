import { Pipe, PipeTransform } from '@angular/core';
import { MessageItem } from 'src/app/connections/modules/people-groups/models/group-dialog';

export type SortComparator = (a: MessageItem, b: MessageItem) => number;

@Pipe({
  name: 'sortBy'
})
export class SortBy implements PipeTransform {
  transform(messages: MessageItem[] | undefined, comparator: SortComparator): MessageItem[] | null {
    if (messages) return messages.slice().sort(comparator);
    return null;
  }
}
