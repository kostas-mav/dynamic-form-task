import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() control = new FormControl('');

  private _value = new BehaviorSubject('');
  private _isDisabled = new BehaviorSubject(false);

  value$ = this._value.asObservable();
  isDisabled$ = this._isDisabled.asObservable();

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  onChange = (value: string) => {};
  onTouch = () => {};

  setValue({ target }: Event) {
    const { value } = target as HTMLInputElement;
    this._value.next(value);
    this.onChange(value);
    this.onTouch();
  }

  writeValue(value: string): void {
    this._value.next(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.next(isDisabled);
  }

  constructor(private formStore: FormStore) {}

  ngOnInit(): void {
    this.formStore.validateForm$
      .pipe(tap(() => this.changeBorderColor()))
      .subscribe();
  }
}
