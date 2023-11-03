import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Form } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent {
  @Output() upload = new EventEmitter<Form>();

  @ViewChild('dropArea', { static: true }) dropArea!: ElementRef;

  selectedFile: File | undefined;
  jsonData: Form | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    this._processFile();
  }

  onDragEnter(event: Event) {
    event.preventDefault();

    this.dropArea.nativeElement.style.backgroundColor = 'cyan';
  }

  onDragLeave(event: Event) {
    event.preventDefault();

    this.dropArea.nativeElement.style.backgroundColor = 'white';
  }

  onDrop(event: Event) {
    event.preventDefault();

    const dropEvent = event as DragEvent;
    this.selectedFile = dropEvent.dataTransfer?.files[0];
    this._processFile();

    this.dropArea.nativeElement.style.backgroundColor = 'white';
  }

  private _processFile() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          this.jsonData = JSON.parse(event.target!.result as string);
          if (this.jsonData) this.upload.next(this.jsonData);
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };

      reader.readAsText(this.selectedFile);
    } else {
      console.error('No file selected.');
    }
  }
}
