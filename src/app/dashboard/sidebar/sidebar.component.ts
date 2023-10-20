import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from 'src/app/shared/components/list-item/list-item.component';

import { SAMPLE } from 'src/mock/example-form';
import { FormStore } from '../data-access/form-store.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ListItemComponent, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  formList$ = this.formStore.formList$;

  uploadList() {
    this.formStore.addFormPreview(SAMPLE);
  }

  removeList(name: string) {
    this.formStore.removeFormFromList(name);
  }

  downloadList(name: string) {
    console.log(`Converting ${name} list for download...`);
  }

  constructor(private formStore: FormStore) {}
}
