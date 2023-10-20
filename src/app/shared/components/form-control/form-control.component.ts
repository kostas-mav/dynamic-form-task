import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../inputs/text/text-input.component';
import { DateInputComponent } from '../inputs/date/date-input.component';
import { ComboboxInputComponent } from '../inputs/combobox/combobox-input.component';
import { ReactiveFormsModule } from '@angular/forms';

export interface Control {
  title: string;
  name: string;
  type: 'text' | 'date' | 'combobox';
  span: number;
  order?: number;
  data?: any[];
  required?: boolean;
  readonly?: boolean;
  defaultValue?: any;
}

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DateInputComponent,
    ComboboxInputComponent,
  ],
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  @Input({ required: true }) control!: Control;
}
