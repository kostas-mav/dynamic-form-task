import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input({ required: true }) name!: string;
  @Output() download = new Subject<string>();
  @Output() remove = new Subject<string>();

  downloadList() {
    this.download.next(this.name);
  }

  removeList() {
    this.remove.next(this.name);
  }
}
