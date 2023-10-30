import {
  Directive, ElementRef, Input, OnInit, Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDateBorder]'
})

export class DateBorderDirective implements OnInit {
  @Input('appDateBorder') publicationDate!: string;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    const publicationDate = new Date(this.publicationDate);
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = currentDate.getTime() - publicationDate.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = timeDifferenceInMilliseconds / millisecondsInADay;

    let borderColor = '';
    if (differenceInDays > 180) {
      borderColor = '#ff0000';
    } else if (differenceInDays > 30) {
      borderColor = '#ffff00';
    } else if (differenceInDays > 7) {
      borderColor = '#00ff00';
    } else {
      borderColor = '#0000ff';
    }

    this.render.setStyle(this.el.nativeElement, 'background-color', borderColor);
  }
}
