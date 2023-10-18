import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {}
