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
import { FormStore } from '../data-access/form-store.service';
import { tap } from 'rxjs';

export interface Form {
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
  readonly formPreview$ = this.formStore.formPreview$;

  formGroup = this.fb.group({});

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  printFormValue() {
    console.log(this.formGroup.value);
  }

  addFormToList(form: Form) {
    // console.log(`Adding form to list...`);
    this.formStore.addFormToList(form);
  }

  validateForm() {
    console.log(`Validating form...`);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private cdRef: ChangeDetectorRef,
    private formStore: FormStore
  ) {}

  ngOnInit(): void {
    this.formPreview$
      .pipe(
        tap((form) => {
          if (form)
            form.groups.forEach((group) => {
              group.controls.forEach((control) => {
                this.formGroup.addControl(
                  control.name,
                  this.fb.control(control.defaultValue ?? '', {
                    validators: [],
                  })
                );
              });
            });
        })
      )
      .subscribe();

    // this.formGroup.valueChanges.subscribe((val) => {
    //   console.log(val);
    // });
  }
}
