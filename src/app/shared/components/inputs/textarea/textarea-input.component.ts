import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaInputComponent,
      multi: true,
    },
  ],
})
export class TextareaInputComponent implements ControlValueAccessor {
  @Input() minRows = 5;

  @ViewChild('textarea', { static: true }) textarea!: ElementRef;

  value: string = '';

  onChange(val: string) {}
  onTouched() {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const element = this.textarea.nativeElement as HTMLTextAreaElement;
    element.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;

    this.value = value;
    this.onChange(value);
  }
}
