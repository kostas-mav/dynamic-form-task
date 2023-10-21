import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
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

  @Input() control = new FormControl('');

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  constructor(private formStore: FormStore) {}

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
