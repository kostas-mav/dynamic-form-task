import { Component, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { DownloadButtonComponent } from 'src/app/data-convertion/download-button/download-button.component';
import { Form } from '../form/form.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DownloadButtonComponent],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input({ required: true }) form!: Form;
  @Output() remove = new Subject<string>();
  @Output() select = new Subject<Form>();

  @HostListener('click') selectItem() {
    this.select.next(this.form);
  }

  removeList() {
    this.remove.next(this.form.title);
  }
}
