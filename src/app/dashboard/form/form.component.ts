import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupComponent,
  Group,
} from 'src/app/shared/components/form-group/form-group.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/inputs/text/text-input.component';
import { DateInputComponent } from 'src/app/shared/components/inputs/date/date-input.component';
import { ComboboxInputComponent } from 'src/app/shared/components/inputs/combobox/combobox-input.component';
import { MaterialModule } from 'src/app/shared/utils/material/material.module';

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
    MaterialModule,
    FormGroupComponent,
    TextInputComponent,
    DateInputComponent,
    ComboboxInputComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  readonly form: Form = SAMPLE;

  formGroup = this.fb.group({});

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  printFormValue() {
    console.log(this.formGroup.value);
  }

  addFormToList() {
    console.log(`Adding form to list...`);
  }

  validateForm() {
    console.log(`Validating form...`);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form.groups.forEach((group) => {
      group.controls.forEach((control) => {
        this.formGroup.addControl(
          control.name,
          this.fb.control(control.defaultValue ?? '', { validators: [] })
        );
      });
    });
    // console.log(this.formGroup.controls);

    this.formGroup.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }
}

const SAMPLE: Form = {
  title: 'My Form 2',
  inline: 12,
  groups: [
    {
      title: 'Passport request',
      inline: 3,
      span: 12,
      controls: [
        {
          title: 'Type',
          name: 'requestType',
          type: 'text',
          required: true,
          readonly: true,
          span: 3,
          defaultValue: 'Passport renewal',
        },
      ],
    },
    {
      title: 'Passport',
      inline: 12,
      span: 12,
      controls: [
        {
          title: 'First name',
          name: 'name',
          type: 'text',
          required: true,
          order: 1,
          span: 3,
          defaultValue: 'John',
        },
        {
          title: 'Middle name',
          name: 'middleName',
          type: 'text',
          required: false,
          order: 2,
          span: 3,
          defaultValue: '',
        },
        {
          title: 'Last name',
          name: 'lastname',
          type: 'text',
          order: 3,
          span: 3,
          defaultValue: 'Doe',
        },
        {
          title: 'No.',
          name: 'no',
          type: 'text',
          required: true,
          order: 0,
          span: 3,
          defaultValue: 'GR 32412',
        },
      ],
    },
    {
      title: 'Location',
      inline: 8,
      span: 8,
      controls: [
        {
          title: 'Country',
          name: 'country',
          type: 'combobox',
          required: true,
          span: 4,
          defaultValue: 'Greece',
          data: ['Greece', 'Italy', 'Spain', 'Bulgaria', 'Turkey'],
        },
        {
          title: 'City',
          name: 'city',
          type: 'combobox',
          span: 4,
          defaultValue: 'Larissa',
          data: [
            'Athens',
            'Thessaloniki',
            'Istanbul',
            'Madrid',
            'Rome',
            'Florence',
          ],
        },
      ],
    },
    {
      title: 'Birth Day',
      inline: 4,
      span: 4,
      controls: [
        {
          title: 'Date',
          name: 'birth',
          type: 'date',
          required: true,
          span: 4,
        },
      ],
    },
  ],
};
