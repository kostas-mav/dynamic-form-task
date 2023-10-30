import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Form, FormComponent } from './form/form.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Group } from '../shared/components/form-group/form-group.component';
import { FormHeaderDirective } from '../shared/directives/form/form-header.directive';
import { FormFooterDirective } from '../shared/directives/form/form-footer.directive';
import { ButtonComponent } from '../shared/components/button/button.component';
import { TextInputComponent } from '../shared/components/inputs/text/text-input.component';
import { includedInDataValidator } from '../shared/utils/validators/value-in-data.validator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    SidebarComponent,
    FormComponent,
    TextInputComponent,
    FormHeaderDirective,
    FormFooterDirective,
  ],
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(FormComponent, { read: ElementRef }) formElement!: ElementRef;

  formList: Form[] = [];
  formPreview: Form | null = null;
  formOutput: { [key: string]: string | null } | null = null;
  formGroup = this.fb.group({});

  titleEditable: boolean = false;
  titleControl = this.fb.control('');

  toggleTitleEdit(event?: KeyboardEvent) {
    if ((event && event.code === 'Enter') || !event) {
      this.titleEditable = !this.titleEditable;
    }
  }

  validateForm() {}

  addFormToList(form: Form | null) {
    if (form === null) return;

    const newForm: Form = JSON.parse(JSON.stringify(form));

    const controlValue = this.titleControl.value as string;

    // In the case of adding a form from preview instead of uploading
    if (controlValue.length) {
      newForm.title = controlValue;
    }

    // Check for duplicate form names
    const duplicateName = this.formList
      .map((form) => form.title)
      .includes(newForm.title);

    // If duplicate found, add date-time to the title
    if (duplicateName) {
      newForm.title = newForm.title.concat(`_${new Date().toLocaleString()}`);
    }

    // Update default values of controls based on pairedFormControl
    newForm.groups.forEach((group) =>
      group.controls.forEach((control) => {
        const pairedFormControl = this.formGroup.get(control.name);

        if (pairedFormControl) control.defaultValue = pairedFormControl.value;
      })
    );

    // Update state and clear form display
    this.formList = [...this.formList, newForm];

    if (this.formPreview) {
      this.removeFormPreview();
    }
  }

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

      this.titleControl.setValue(form.title);
      this.formPreview = this._sortFormGroupByOrder(form);
    }
  }

  removeFormFromList(name: string) {
    const remainingForms = this.formList.filter(
      (existingForm) => existingForm.title !== name
    );

    // Update state and clear form display
    this.formList = remainingForms;
    if (this.formPreview && this.formPreview.title === name) {
      this.removeFormPreview();
    }
  }

  updateFormOutput() {
    this.formOutput = this.formGroup.value;
  }

  removeFormPreview() {
    this.formGroup = this.fb.group({});
    this.formPreview = null;
    this.formOutput = null;
  }

  constructor(private fb: FormBuilder) {}

  private _sortFormGroupByOrder(form: Form) {
    const updatedGroups: Group[] = form.groups.map((group) => {
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

    const updatedForm: Form = {
      ...form,
      groups: updatedGroups,
    };

    return updatedForm;
  }
}
