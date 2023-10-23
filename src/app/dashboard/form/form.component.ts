import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupComponent,
  Group,
} from 'src/app/shared/components/form-group/form-group.component';
import {
  FormBuilder,
  FormControl,
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
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';

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
    FormControlComponent,
    TextInputComponent,
    DateInputComponent,
    ComboboxInputComponent,
    ButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  readonly formPreview$ = this.formStore.formPreview$.pipe(
    tap((form) => {
      if (form) {
        // Set form controls for every item
        form.groups.forEach((group) => {
          group.controls.forEach((control) => {
            const newControl = this.fb.control('');

            if (control.type !== 'combobox') {
              if (control.defaultValue)
                newControl.setValue(control.defaultValue);
            } else {
              // Check if the default value is valid and exists in the data of
              // the combobox input
              let valueFoundInData: boolean = false;

              if (control.data && control.defaultValue)
                valueFoundInData = control.data.includes(control.defaultValue);

              if (control.defaultValue && valueFoundInData) {
                newControl.setValue(control.defaultValue);
              } else {
                newControl.setValue(null);
              }
            }

            // Set control statuses
            if (control.required) newControl.addValidators(Validators.required);
            if (control.readonly) newControl.disable();

            this.formGroup.setControl(control.name, newControl);
          });
        });
      }
    }),
    map((form) => {
      if (form) {
        // Sort controls within groups by order if applicable
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
    }),
    // JavaScript magic to update action button disabled state
    tap(() => setTimeout(() => this.cdRef.detectChanges()))
  );

  formOutput$ = this.formStore.formOutput$;
  formGroup = this.formStore.formGroup;

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  printFormValue() {
    // console.log(this.formGroup.value);
    this.formStore.updateFormOutput();
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
}
