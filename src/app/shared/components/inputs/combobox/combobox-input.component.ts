import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-combobox-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './combobox-input.component.html',
  styleUrls: ['./combobox-input.component.scss'],
})
export class ComboboxInputComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  @Input() control = this.fb.control('');
  @Input() options: string[] = [];

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  updateOption(event: any) {
    this.control.setValue(event.target.value as string);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private formStore: FormStore
  ) {}

  ngOnInit(): void {
    this.formStore.validateForm$
      .pipe(
        takeUntil(this._destroy$),
        tap(() => this.changeBorderColor())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
