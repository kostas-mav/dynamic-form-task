import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from 'src/app/shared/components/form-group/form-group.component';
import { TextInputComponent } from 'src/app/shared/components/inputs/text/text-input.component';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

interface Form {
  title: string;
  inline: number;
  groups: Group[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder) {}

  form = this.fb.group({
    test: '',
  });

  ngOnInit(): void {
    this.form.controls.test.valueChanges.subscribe(() => {
      console.log(this.form.controls.test.touched);
    });
  }
}
