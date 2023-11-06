import {
  Directive, ElementRef, Input, OnInit, Renderer2
} from '@angular/core';
import { BorderColor } from '../enums/search-item-enum';

@Directive({
  selector: '[appDateColor]'
})
export class DateColorDirective implements OnInit {
  @Input('appDateColor') publicationDate!: string;
  @Input() cssProperty = 'background-color';

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    const publicationDate = new Date(this.publicationDate);
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = currentDate.getTime() - publicationDate.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = timeDifferenceInMilliseconds / millisecondsInADay;

    let colorValue: string;

    if (differenceInDays > 180) {
      colorValue = BorderColor.OlderThan6Months;
    } else if (differenceInDays > 30) {
      colorValue = BorderColor.Between1And6Months;
    } else if (differenceInDays > 7) {
      colorValue = BorderColor.Between7DaysAnd1Month;
    } else {
      colorValue = BorderColor.NewerThan7Days;
    }

    if (this.cssProperty === 'box-shadow') {
      colorValue = `5px 10px 10px 0px ${colorValue.substring(0, colorValue.length - 2)} 0.25)`;
    }

    this.render.setStyle(this.el.nativeElement, this.cssProperty, colorValue);
  }
}
