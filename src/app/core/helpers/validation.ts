import { FormBuilder, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';

// Create a shared FormBuilder instance
const formBuilder = new FormBuilder();

//trimming function to remove blank space from input
export function validateByTrimming(validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl) => {
    const trimmedValue = control.value.trim();
    const trimmedControl = formBuilder.control(trimmedValue);
    return validators.reduce<ValidationErrors | null>((error, validator) => error || validator(trimmedControl), null); // Apply the provided validators to the trimmed value
  };
}

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

export const otpConcateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const digit1 = control.get('digit1')?.value;
  const digit2 = control.get('digit2')?.value;
  const digit3 = control.get('digit3')?.value;
  const digit4 = control.get('digit4')?.value;



  if (!digit1 || !digit2 || !digit3 || !digit4) {
    return { required: true };
  } else if (isNaN(digit1) || isNaN(digit2) || isNaN(digit3) || isNaN(digit4)) {
    return { pattern:true};
  }
  return null;
};
