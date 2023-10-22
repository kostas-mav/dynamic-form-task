import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupComponent,
  Group,
} from 'src/app/shared/components/form-group/form-group.component';
import {
  FormBuilder,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  readonly formPreview$ = this.formStore.formPreview$.pipe(
    tap((form) => {
      if (form) {
        form.groups.forEach((group) => {
          group.controls.forEach((control) => {
            const newControl = this.fb.control('');

            if (control.type !== 'combobox') {
              if (control.defaultValue)
                newControl.setValue(control.defaultValue);

              if (control.required)
                newControl.addValidators(Validators.required);

              if (control.readonly) newControl.disable();

              this.formGroup.setControl(control.name, newControl);
            } else {
              let valueFoundInData: boolean = false;

              if (control.data && control.defaultValue)
                valueFoundInData = control.data.includes(control.defaultValue);

              if (control.defaultValue && valueFoundInData) {
                newControl.setValue(control.defaultValue);
              } else {
                newControl.setValue(null);
              }

              if (control.required)
                newControl.addValidators(Validators.required);

              if (control.readonly) newControl.disable();

              this.formGroup.setControl(control.name, newControl);
            }
          });
        });
      }
    }),
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

        console.log(this.formGroup.value);

        return updatedForm;
      } else {
        return form;
      }
    }),
    tap(() => setTimeout(() => this.cdRef.detectChanges()))
  );

  formGroup = this.formStore.formGroup;

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  printFormValue() {
    console.log(this.formGroup.value);
  }

  addFormToList(form: Form) {
    this.formStore.addFormToList(form);
  }

  validateForm() {
    this.formStore.validateForm$.next();
  }

  constructor(
    private fb: FormBuilder,
    private formStore: FormStore,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.formGroup.valueChanges.subscribe(console.log);
  }
}
