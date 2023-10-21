import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupComponent,
  Group,
} from 'src/app/shared/components/form-group/form-group.component';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/inputs/text/text-input.component';
import { DateInputComponent } from 'src/app/shared/components/inputs/date/date-input.component';
import { ComboboxInputComponent } from 'src/app/shared/components/inputs/combobox/combobox-input.component';
import { MaterialModule } from 'src/app/shared/utils/material/material.module';
import { FormStore } from '../data-access/form-store.service';
import { map, tap } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

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
    ButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  readonly formPreview$ = this.formStore.formPreview$.pipe(
    map((form) => {
      if (form) {
        const updatedGroups = form.groups.map((group) => {
          const orderedControls = group.controls.filter(
            (obj) => obj.order !== undefined
          );

          if (orderedControls.length) {
            orderedControls.sort(
              (a, b) => (a.order as number) - (b.order as number)
            );
          }

          const unorderedControls = group.controls.filter(
            (obj) => obj.order === undefined
          );

          return {
            ...group,
            controls: orderedControls.concat(unorderedControls),
          };
        });

        const updatedForm = {
          ...form,
          groups: updatedGroups,
        };

        return updatedForm;
      } else {
        return form;
      }
    })
  );

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
    this.formStore.validateForm$.next();
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
                const newControl = this.fb.control('');

                if (control.defaultValue)
                  newControl.setValue(control.defaultValue);

                if (control.required)
                  newControl.addValidators(Validators.required);

                if (control.readonly) newControl.disable();

                this.formGroup.addControl(control.name, newControl);
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
