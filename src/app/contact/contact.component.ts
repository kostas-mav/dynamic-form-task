import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';
import { Form, FormComponent } from '../shared/components/form/form.component';
import { FormFooterDirective } from '../shared/directives/form/form-footer.directive';
import { FormHeaderDirective } from '../shared/directives/form/form-header.directive';
import { ACCOUNT_FORM_SAMPLE } from 'src/mock/contact-forms/account';
import { BUG_FORM_SAMPLE } from 'src/mock/contact-forms/bug';
import { CHARGING_FORM_SAMPLE } from 'src/mock/contact-forms/charging';
import { ComboboxInputComponent } from '../shared/components/inputs/combobox/combobox-input.component';
import { Control } from '../shared/components/form-control/form-control.component';
import { TextareaInputComponent } from '../shared/components/inputs/textarea/textarea-input.component';
import { distinctUntilChanged, filter, merge, tap } from 'rxjs';
import { includedInDataValidator } from '../shared/utils/validators/value-in-data.validator';
import { sortFormGroupsByOrder } from '../shared/utils/functions/sort-form-groups-by-order';
import { OTHER_FORM_SAMPLE } from 'src/mock/contact-forms/other';

const SAMPLES: Form[] = [
  ACCOUNT_FORM_SAMPLE,
  BUG_FORM_SAMPLE,
  CHARGING_FORM_SAMPLE,
  OTHER_FORM_SAMPLE,
];

const CATEGORY_CONTROL: Control = {
  title: 'Category',
  name: 'category',
  type: 'combobox',
  required: true,
  span: 3,
  data: SAMPLES.map((form) => form.title),
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormComponent,
    FormHeaderDirective,
    FormFooterDirective,
    ComboboxInputComponent,
    TextareaInputComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private fb = inject(NonNullableFormBuilder);

  forms = SAMPLES;
  categoryOptions = CATEGORY_CONTROL.data as string[];
  formPreview: Form | null = null;
  formGroup = this.fb.group({});

  categoryControl = this.fb.control('', {
    validators: [
      Validators.required,
      includedInDataValidator(this.categoryOptions),
    ],
  });

  subscriptions$ = merge(
    this.categoryControl.valueChanges.pipe(
      filter(() => this.categoryControl.valid),
      distinctUntilChanged(),
      tap((val) => {
        const selectedForm = this.forms.filter((form) => form.title === val)[0];

        this.addFormPreview(selectedForm);
      })
    )
  );

  addFormPreview(form: Form) {
    if (form) {
      // Set form controls for every item
      form.groups.forEach((group) => {
        group.controls.forEach((control) => {
          const newControl = this.fb.control('');

          if (control.type !== 'combobox') {
            if (control.defaultValue) {
              newControl.setValue(control.defaultValue);
            }
          } else {
            // Check if the default value is valid and exists in the data of
            // the combobox input
            let valueFoundInData: boolean = false;

            if (control.data && control.defaultValue) {
              valueFoundInData = control.data.includes(control.defaultValue);
            }

            if (control.defaultValue && valueFoundInData) {
              newControl.setValue(control.defaultValue);
            } else {
              newControl.setValue('');
            }
          }

          // Set control validators
          if (control.required) {
            newControl.addValidators(Validators.required);
          }
          if (control.type === 'combobox') {
            newControl.addValidators(
              includedInDataValidator(control.data ?? [])
            );
          }

          // Set control statuses
          if (control.readonly) {
            newControl.disable();
          }

          this.formGroup.setControl(control.name, newControl);
        });
      });

      this.formPreview = sortFormGroupsByOrder(form);
    }
  }

  removeFormPreview() {
    this.formGroup = this.fb.group({});
    this.formPreview = null;
  }
}
