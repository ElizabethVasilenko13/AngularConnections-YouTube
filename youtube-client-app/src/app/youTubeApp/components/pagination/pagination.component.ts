import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage: number | null = 1;
  @Output() nextClicked = new EventEmitter<void>();
  @Output() prevClicked = new EventEmitter<void>();
}
