import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Control,
  FormControlComponent,
} from '../form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../utils/material/material.module';

export interface Group {
  title: string;
  inline: number;
  span: number;
  controls: Control[];
}

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormControlComponent,
  ],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent {
  @Input({ required: true }) group!: Group;
}
