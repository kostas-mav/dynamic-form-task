import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  @Input({ required: true }) control = new FormControl('');
  @Output() clicked = new Subject<void>();
  @Output() blured = new Subject<void>();

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;
  @HostListener('click') elementClicked() {
    this.clicked.next();
  }
  @HostListener('blur') elementBlured() {
    this.blured.next();
  }

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  constructor(private formStore: FormStore) {}

  ngOnInit(): void {
    // Listen for the validate action
    this.formStore.validateForm$
      .pipe(
        takeUntil(this._destroy$),
        tap(() => this.changeBorderColor())
      )
      .subscribe();
  }

  // Ensure all subscriptions are unsubscribed
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
