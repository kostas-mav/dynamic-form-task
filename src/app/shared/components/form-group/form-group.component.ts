import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Control } from '../form-control/form-control.component';

export interface Group {
  title: string;
  inline: number;
  span: number;
  controls: Control[];
}

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent {}
