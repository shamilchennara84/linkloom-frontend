import { FormBuilder, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';

// Create a shared FormBuilder instance
const formBuilder = new FormBuilder();

//password matching 
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('confirmPassword');
  if (repeatPassword?.value === '') {
    repeatPassword.setErrors({ required: true });
    return { required: true };
  }
  const passwordMatch = password?.value === repeatPassword?.value;
  repeatPassword?.setErrors(passwordMatch ? null : { passwordMismatch: true });
  return passwordMatch ? null : { passwordMismatch: true };
};

//trimming function to remove blank space from input
export function validateByTrimming(validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl) => {
    const trimmedValue = control.value.trim();
    const trimmedControl = formBuilder.control(trimmedValue);
    return validators.reduce<ValidationErrors | null>((error, validator) => error || validator(trimmedControl), null); // Apply the provided validators to the trimmed value
  };
}

