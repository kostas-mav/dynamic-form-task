import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../inputs/text/text-input.component';
import { DateInputComponent } from '../inputs/date/date-input.component';
import { ComboboxInputComponent } from '../inputs/combobox/combobox-input.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from '../inputs/textarea/textarea-input.component';
import { FormControlHighlightDirective } from '../../directives/form/form-control-highlight.directive';

export interface Control {
  title: string;
  name: string;
  type: 'text' | 'date' | 'combobox' | 'textarea';
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
    TextareaInputComponent,
    FormControlHighlightDirective,
  ],
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  @Input({ required: true }) control!: Control;
  @Input({ required: true }) formGroup!: FormGroup;
}
