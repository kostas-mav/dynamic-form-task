import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
})
export class ComboboxInputComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  @Input() control = this.fb.control('');
  @Input() options: string[] = [];

  displayedOptions$ = new BehaviorSubject<string[]>([]);

  dropdownEnabled$ = new BehaviorSubject<boolean>(false);

  handleClickOutside(event: Event) {
    this.dropdownEnabled$.next(false);
  }

  updateControl(event: any) {
    this.control.setValue(event);
    this.dropdownEnabled$.next(false);
  }

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    // Filter the displayed options by the input value
    this.control.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        tap((val) => {
          const validOptions = this.options.filter((option) =>
            option.toLowerCase().includes(val.toLowerCase())
          );

          this.displayedOptions$.next(validOptions);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
