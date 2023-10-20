import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Form } from 'src/app/dashboard/form/form.component';

@Component({
  selector: '[appDownloadButton]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent {
  @Input({ required: true }) form!: Form;

  @HostListener('click') downloadJsonFile() {
    const jsonContent = JSON.stringify(this.form, null, 2); // Use null and 2 for pretty-printing

    // Create a Blob (Binary Large Object) with the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // Create an object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement('a');
    a.href = url;

    // Specify the filename for the downloaded file (e.g., based on a property of the object)
    a.download = `${this.form.title}.json`;

    // Simulate a click on the anchor to trigger the download
    a.click();

    // Release the object URL
    window.URL.revokeObjectURL(url);
  }
}
