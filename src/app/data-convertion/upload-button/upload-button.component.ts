import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form } from 'src/app/dashboard/form/form.component';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent {
  selectedFile: File | undefined;
  jsonData: Form | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    this._processFile();
  }

  // onDrag(event: Event) {
  //   event.preventDefault();
  // }

  onDrop(event: Event) {
    event.preventDefault();
    const dropEvent = event as DragEvent;
    this.selectedFile = dropEvent.dataTransfer?.files[0];

    this._processFile();
  }

  private _processFile() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          this.jsonData = JSON.parse(event.target!.result as string);
          console.log(this.jsonData);
          if (this.jsonData) this.formStore.addFormPreview(this.jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };

      reader.readAsText(this.selectedFile);
    } else {
      console.error('No file selected.');
    }
  }

  constructor(private formStore: FormStore) {}
}
