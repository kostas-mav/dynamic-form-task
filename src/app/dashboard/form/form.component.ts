import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from 'src/app/shared/components/form-group/form-group.component';
import { TextInputComponent } from 'src/app/shared/components/inputs/text/text-input.component';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from 'src/app/shared/components/inputs/date/date-input.component';

interface Form {
  title: string;
  inline: number;
  groups: Group[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DateInputComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder) {}

  form = this.fb.group({
    text: '',
  });

  ngOnInit(): void {
    this.form.controls.text.valueChanges.subscribe(() => {
      console.log(this.form.controls.text.touched);
    });
  }
}
