import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[appButton]',
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
        background-color: var(--primary);
        color: white;
      }
    `,
  ],
})
export class ButtonComponent {}
