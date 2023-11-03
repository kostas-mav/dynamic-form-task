import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Returns the control error "invalidData" if the control value is not
 * included in the given data array.
 */
export function includedInDataValidator(data: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value === undefined ||
      control.value === null ||
      control.value === ''
    ) {
      return null;
    }

    return data.includes(control.value)
      ? null
      : {
          invalidData: true,
        };
  };
}
