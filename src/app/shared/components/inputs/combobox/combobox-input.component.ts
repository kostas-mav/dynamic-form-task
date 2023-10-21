import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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
  @Input() options: string[] = ['One', 'Two', 'Three'];

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  documentClickHandler(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInsideComponent = this.elRef.nativeElement.contains(clickedElement);
    if (!isInsideComponent) {
      this.displayOptions = false;
    }
  }

  selectedOption: string = '';
  componentDisabled: boolean = false;
  displayOptions: boolean = false;

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  updateOption(event: any) {
    this.selectOptionHandler(event.target.value as string);
  }

  selectOptionHandler(option: string) {
    this.selectedOption = option;
    this.control.setValue(option);
    this.toggleOptions();
    this.cdRef.detectChanges();
  }

  toggleOptions() {
    this.displayOptions = !this.displayOptions;
    this.control.markAsTouched();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
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
