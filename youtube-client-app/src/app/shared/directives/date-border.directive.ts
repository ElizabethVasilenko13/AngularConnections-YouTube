import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';
import { BorderColor } from '../enums/search-item-enum';

@Directive({
  selector: '[appDateBorder]',
})
export class DateBorderDirective implements OnInit {
  @Input('appDateBorder') publicationDate!: string;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    const publicationDate = new Date(this.publicationDate);
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = currentDate.getTime() - publicationDate.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = timeDifferenceInMilliseconds / millisecondsInADay;

    let borderColor: string;

    if (differenceInDays > 180) {
      borderColor = BorderColor.OlderThan6Months;
    } else if (differenceInDays > 30) {
      borderColor = BorderColor.Between1And6Months;
    } else if (differenceInDays > 7) {
      borderColor = BorderColor.Between7DaysAnd1Month;
    } else {
      borderColor = BorderColor.NewerThan7Days;
    }

    this.render.setStyle(this.el.nativeElement, 'background-color', borderColor);
  }
}
