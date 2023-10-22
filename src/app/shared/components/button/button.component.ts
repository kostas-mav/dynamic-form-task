import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
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
      :host(.primary) {
        background-color: var(--primary);
        color: white;
      }
      :host(.secondary) {
        background-color: var(--secondary);
        color: white;
      }
      :host(.warn) {
        background-color: var(--warn);
        color: white;
      }
      :host(.neutral) {
        background-color: var(--neutral);
        color: var(--font);
      }
      :host(.disabled) {
        cursor: not-allowed;
        filter: opacity(50%);
      }
    `,
  ],
})
export class ButtonComponent implements OnChanges, OnInit {
  @Input() disabled: boolean = false;
  @Input() color: 'primary' | 'secondary' | 'warn' | 'neutral' = 'primary';

  @HostBinding('disabled') hostDisabled: boolean = false;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._applyHostAttributes();
  }

  ngOnInit() {
    this._applyHostAttributes();
  }

  private _applyHostAttributes() {
    this.hostDisabled = this.disabled;
    this._applyClasses();
  }

  private _applyClasses() {
    if (this.color)
      this.renderer.addClass(this.elRef.nativeElement, this.color);
    if (this.disabled) {
      this.renderer.addClass(this.elRef.nativeElement, 'disabled');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'disabled');
    }
  }
}
