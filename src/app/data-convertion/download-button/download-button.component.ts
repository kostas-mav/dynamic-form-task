import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Form } from 'src/app/shared/components/form/form.component';

@Component({
  selector: '[appDownloadButton]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        background-color: transparent;
        color: gray;
      }
    `,
  ],
})
export class DownloadButtonComponent {
  @Input({ required: true }) form!: Form;

  @HostListener('click') downloadJsonFile() {
    const jsonContent = JSON.stringify(this.form, null, 2);

    // Create a Blob for the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // Create an object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement('a');
    a.href = url;

    // Specify the filename
    a.download = `${this.form.title}.json`;

    // Τrigger the download
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
