import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'course-pf-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() imageUrl: string;
  @Input() withButton: boolean;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
