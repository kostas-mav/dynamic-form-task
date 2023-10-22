import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Form } from '../form/form.component';
import { Observable, Subject, take, tap, withLatestFrom } from 'rxjs';
import { SAMPLE } from 'src/mock/example-form';
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

  readonly formList$ = this.select((state) => state.formList);
  readonly formPreview$ = this.select((state) => state.formPreview);
  readonly formOutput$ = this.select((state) => state.formOutput);

  formGroup = this.fb.group({});
  validateForm$ = new Subject<void>();

  addFormToList = this.effect((form$: Observable<Form>) =>
    form$.pipe(
      withLatestFrom(this.formList$),
      tap(([form, formList]) => {
        const newForm: Form = JSON.parse(JSON.stringify(form));

        const duplicateName = formList
          .map((form) => form.title)
          .includes(newForm.title);

        if (duplicateName)
          newForm.title = newForm.title.concat(
            `_${new Date().toLocaleString()}`
          );

        newForm.groups.forEach((group) =>
          group.controls.forEach((control) => {
            const pairedFormControl = this.formGroup.get(control.name);

            if (pairedFormControl)
              control.defaultValue = pairedFormControl.value;
          })
        );

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
