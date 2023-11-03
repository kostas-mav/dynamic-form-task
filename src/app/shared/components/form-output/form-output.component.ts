import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-output.component.html',
  styleUrls: ['./form-output.component.scss'],
})
export class FormOutputComponent {
  @Input({ required: true }) formOutput!: { [key: string]: string | null };
}
