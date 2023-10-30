import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/utils/material/material.module';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { isEmpty } from 'lodash';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputComponent,
      multi: true,
    },
  ],
})
export class DateInputComponent implements OnDestroy, ControlValueAccessor {
  private _destroy$ = new Subject<null>();

  @Output() cancelDate = new EventEmitter<void>();

  value: string = '';
  disabled: boolean = false;
  dateJson$ = new BehaviorSubject('');

  datepickerControl = this.fb.control<Date | null>(
    isEmpty(this.value) ? null : new Date(this.value)
  );

  clearControl() {
    this.value = '';
    this.datepickerControl.setValue(null);
    this.onChange('');
  }

  onChange(value: string) {}
  onTouch() {}

  writeValue(newValue: string): void {
    if (newValue) {
      this.datepickerControl.setValue(new Date(newValue));
      this.dateJson$.next(newValue);
    }
  }

  registerOnChange(fn: any): void {
    this.datepickerControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        tap((val: Date | null) => {
          if (val && typeof val === 'object') {
            fn(val.toISOString());

            this.dateJson$.next(val.toISOString());
          } else {
            fn('');

            this.dateJson$.next('');
          }
        })
      )
      .subscribe();
  }

  registerOnTouched(fn: any): void {
    this.datepickerControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        tap(() => fn())
      )
      .subscribe();
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.datepickerControl.disable();
    } else {
      this.datepickerControl.enable();
    }
  }

  constructor(private fb: FormBuilder) {}

  // Ensure all subscriptions are unsubscribed
  ngOnDestroy(): void {
    this._destroy$.next(null);
  }
}
