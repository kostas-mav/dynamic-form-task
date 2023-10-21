import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Form } from '../form/form.component';
import { Subject, take, tap, withLatestFrom } from 'rxjs';
import { SAMPLE } from 'src/mock/example-form';

interface FormState {
  formList: Form[];
  formPreview: Form | null;
}

@Injectable({
  providedIn: 'root',
})
export class FormStore extends ComponentStore<FormState> {
  constructor() {
    super({
      formList: [],
      formPreview: SAMPLE,
    });
  }

  readonly formList$ = this.select((state) => state.formList);
  readonly formPreview$ = this.select((state) => state.formPreview);

  validateForm$ = new Subject<void>();

  addFormToList(form: Form) {
    this.formList$
      .pipe(
        take(1),
        tap((existingForms) =>
          this.patchState({ formList: [...existingForms, form] })
        )
      )
      .subscribe();
  }

  removeFormFromList(name: string) {
    this.formList$
      .pipe(
        withLatestFrom(this.formPreview$),
        take(1),
        tap(([existingForms, formPreview]) => {
          const remainingForms = existingForms.filter(
            (existingForm) => existingForm.title !== name
          );

          this.patchState({ formList: remainingForms });

          if (formPreview && formPreview.title === name)
            this.removeFormPreview();
        })
      )
      .subscribe();
  }

  addFormPreview(form: Form) {
    this.patchState({ formPreview: form });
  }

  removeFormPreview() {
    this.patchState({ formPreview: null });
  }
}
