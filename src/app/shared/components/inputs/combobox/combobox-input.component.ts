import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormStore } from 'src/app/dashboard/data-access/form-store.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-combobox-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
export class ComboboxInputComponent implements ControlValueAccessor, OnInit {
  @Input() control = this.fb.control('');

  @ViewChild('inputElRef', { static: true }) inputElRef!: ElementRef;

  changeBorderColor() {
    if (this.control.invalid) {
      this.inputElRef.nativeElement.style.borderColor = 'red';
    } else {
      this.inputElRef.nativeElement.style.borderColor = 'green';
    }
  }

  updateOption(event: any) {
    console.log(event.target.value);
    this.selectOptionHandler(event.target.value as string);
  }

  @Input() options: string[] = ['One', 'Two', 'Three'];

  selectedOption: string = '';
  componentDisabled: boolean = false;
  displayOptions: boolean = false;

  @HostListener('document:click', ['$event'])
  documentClickHandler(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInsideComponent = this.elRef.nativeElement.contains(clickedElement);
    if (!isInsideComponent) {
      this.displayOptions = false;
    }
  }

  selectOptionHandler(option: string) {
    this.selectedOption = option;
    this.onChange(option);
    this.toggleOptions();
    this.cdRef.detectChanges();
  }

  toggleOptions() {
    this.displayOptions = !this.displayOptions;
    this.onTouched();
  }

  onChange = (arg: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.options.forEach((option) => {
      if (option === value) {
        this.selectedOption = option;
        this.onChange(value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.componentDisabled = isDisabled;
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private formStore: FormStore
  ) {}

  ngOnInit(): void {
    this.formStore.validateForm$
      .pipe(tap(() => this.changeBorderColor()))
      .subscribe();
  }
}
