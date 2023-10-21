import { Component, ElementRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/utils/material/material.module';
import { BehaviorSubject, Subject, merge, takeUntil, tap } from 'rxjs';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { isEmpty } from 'lodash';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent {
  @Input() control = this.fb.control('');
  @Input() placeholder = 'Pick a date';
  @Output() cancelDate = new Subject<void>();

  clearControl() {
    this.control.setValue('');
  }

  dateJson$ = new BehaviorSubject('');

  datepickerControl = this.fb.control<Date | null>(
    isEmpty(this.control.value) ? null : new Date(this.control.value as string)
  );

  changeBorderColor() {
    if (this.control.invalid) {
      this.elRef.nativeElement.style.borderColor = 'red';
    } else {
      this.elRef.nativeElement.style.borderColor = 'green';
    }
  }

  constructor(
    private fb: FormBuilder,
    private elRef: ElementRef,
    private formStore: FormStore
  ) {}

  ngOnInit(): void {
    if (!isEmpty(this.control.value)) {
      this.datepickerControl = this.fb.control(
        new Date(this.control.value as string)
      );
      this.dateJson$.next(this.control.value as string);
    }

    // Subscriptions
    merge(
      this.formStore.validateForm$.pipe(tap(() => this.changeBorderColor())),
      this.datepickerControl.valueChanges.pipe(
        takeUntil(this._destroy$),
        tap((val: Date | null) => {
          if (val && typeof val === 'object') {
            this._setControlValue(val.toISOString());
          } else {
            this._setControlValue('');
          }
        })
      ),

      this.control.valueChanges.pipe(
        takeUntil(this._destroy$),
        tap((val: string | null) => {
          if (isEmpty(val)) {
            this.datepickerControl.setValue(null, { emitEvent: false });
            this.dateJson$.next('');
          } else {
            this.datepickerControl.setValue(new Date(val as string), {
              emitEvent: false,
            });
            this.dateJson$.next(val as string);
          }
        })
      )
    ).subscribe();
  }

  private _destroy$ = new Subject<null>();

  private _setControlValue(value: string) {
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.control.setValue(value);
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
  }
}
