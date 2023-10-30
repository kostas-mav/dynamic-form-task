import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Output() click = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() keyup = new EventEmitter();

  value: string = '';
  disabled: boolean = false;

  onChange(value: string) {}
  onTouch() {}

  setValue(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;

    if (this.value !== newValue) {
      this.value = newValue;
      this.onChange(newValue);
    }
  }

  writeValue(newValue: string): void {
    this.value = newValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
