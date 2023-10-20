import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { DownloadButtonComponent } from 'src/app/data-convertion/download-button/download-button.component';
import { Form } from 'src/app/dashboard/form/form.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DownloadButtonComponent],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input({ required: true }) form!: Form;
  @Output() download = new Subject<string>();
  @Output() remove = new Subject<string>();

  downloadList() {
    this.download.next(this.form.title);
  }

  removeList() {
    this.remove.next(this.form.title);
  }
}
