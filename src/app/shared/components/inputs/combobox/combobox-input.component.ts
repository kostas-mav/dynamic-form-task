import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject, Subject, startWith, takeUntil, tap } from 'rxjs';
import { TextInputComponent } from '../text/text-input.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside/click-outside.directive';

@Component({
  selector: 'app-combobox-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './combobox-input.component.html',
  styleUrls: ['./combobox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ComboboxInputComponent,
      multi: true,
    },
  ],
})
export class ComboboxInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private _destroy$ = new Subject<void>();

  @Input() options: string[] = [];

  textInputControl = new FormControl('');

  displayedOptions$ = new BehaviorSubject<string[]>([]);
  dropdownEnabled$ = new BehaviorSubject<boolean>(false);
  disabled: boolean = false;

  handleClickOutside(event: Event) {
    this.dropdownEnabled$.next(false);
  }

  onChange(value: string) {}
  onTouch() {}

  setValue(newValue: string) {
    this.textInputControl.setValue(newValue);
    this.dropdownEnabled$.next(false);
    this.onChange(newValue);
  }

  writeValue(newValue: string): void {
    this.textInputControl.setValue(newValue, { emitEvent: false });
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

  ngOnInit(): void {
    // Filter the displayed options by the input value
    this.textInputControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        tap((val) => {
          // Triggering .onChange() to ensure validation when a user has selected
          // an option and then removes or adds characters.
          this.onChange(val as string);

          const validOptions = this.options.filter((option) =>
            option.toLowerCase().includes((val as string).toLowerCase())
          );

          this.displayedOptions$.next(validOptions);

          if (validOptions.length) {
            this.dropdownEnabled$.next(true);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
