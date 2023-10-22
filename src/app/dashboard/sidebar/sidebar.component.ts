import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from 'src/app/shared/components/list-item/list-item.component';
import { FormStore } from '../data-access/form-store.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { UploadButtonComponent } from 'src/app/data-convertion/upload-button/upload-button.component';
import { Form } from '../form/form.component';

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
  formList$ = this.formStore.formList$;

  removeList(name: string) {
    this.formStore.removeFormFromList(name);
  }

  selectFormPreview(form: Form) {
    this.formStore.removeFormPreview();
    this.formStore.addFormPreview(form);
  }

  constructor(private formStore: FormStore, private cdRef: ChangeDetectorRef) {}
}
