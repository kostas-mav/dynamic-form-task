import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from 'src/app/shared/components/list-item/list-item.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { UploadButtonComponent } from 'src/app/data-convertion/upload-button/upload-button.component';
import { Form } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent,
    ButtonComponent,
    UploadButtonComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() formList: Form[] = [];

  @Output() remove = new EventEmitter<string>();
  @Output() select = new EventEmitter<Form>();
  @Output() upload = new EventEmitter<Form>();
}
