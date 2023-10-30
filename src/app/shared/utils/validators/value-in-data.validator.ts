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
    const required = control.hasValidator(Validators.required);
    const value = control.value as string;

    if (required && value.length && !data.includes(value)) {
      return {
        invalidData: true,
      };
    } else if (!required && value.length && !data.includes(value)) {
      return {
        invalidData: true,
      };
    } else {
      return null;
    }
  };
}
