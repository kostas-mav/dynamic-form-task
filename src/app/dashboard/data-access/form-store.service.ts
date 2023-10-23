import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Form } from '../form/form.component';
import { Observable, Subject, tap, withLatestFrom } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';

interface FormState {
  formList: Form[];
  formPreview: Form | null;
  formOutput: { [key: string]: string | null } | null;
}

@Injectable({
  providedIn: 'root',
})
export class FormStore extends ComponentStore<FormState> {
  constructor(private fb: NonNullableFormBuilder) {
    super({
      formList: [],
      formPreview: null,
      formOutput: null,
    });
  }

  // Selectors for properties of the state
  readonly formList$ = this.select((state) => state.formList);
  readonly formPreview$ = this.select((state) => state.formPreview);
  readonly formOutput$ = this.select((state) => state.formOutput);

  // Centralized form and validate trigger
  formGroup = this.fb.group({});
  validateForm$ = new Subject<void>();

  addFormToList = this.effect((form$: Observable<Form>) =>
    form$.pipe(
      withLatestFrom(this.formList$),
      tap(([form, formList]) => {
        const newForm: Form = JSON.parse(JSON.stringify(form));

        // Check for duplicate form names
        const duplicateName = formList
          .map((form) => form.title)
          .includes(newForm.title);

        // If duplicate found, add date-time to the title
        if (duplicateName)
          newForm.title = newForm.title.concat(
            `_${new Date().toLocaleString()}`
          );

        // Update default values of controls based on pairedFormControl
        newForm.groups.forEach((group) =>
          group.controls.forEach((control) => {
            const pairedFormControl = this.formGroup.get(control.name);

            if (pairedFormControl)
              control.defaultValue = pairedFormControl.value;
          })
        );

        // Update state and clear form display
        this.patchState({ formList: [...formList, newForm] });
        this.removeFormPreview();
      })
    )
  );

  removeFormFromList = this.effect((name$: Observable<string>) =>
    name$.pipe(
      withLatestFrom(this.formList$, this.formPreview$),
      tap(([name, formList, formPreview]) => {
        const remainingForms = formList.filter(
          (existingForm) => existingForm.title !== name
        );

        // Update state and clear form display
        this.patchState({ formList: remainingForms });
        if (formPreview && formPreview.title === name) this.removeFormPreview();
      })
    )
  );

  addFormPreview = this.effect((form$: Observable<Form>) =>
    form$.pipe(
      tap((form) => {
        this.patchState({ formPreview: form });
      })
    )
  );

  removeFormPreview = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ formPreview: null, formOutput: null });
      })
    )
  );

  updateFormOutput = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ formOutput: this.formGroup.value });
      })
    )
  );
}
