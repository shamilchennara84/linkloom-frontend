import { FormBuilder, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { MinAge, MinDate } from '../../shared/constants';

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


export const validateDOB: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dob = control.get('dob');
  if (dob == null) return null;

  const selectedDate = new Date(dob.value);


  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - MinAge, today.getMonth(), today.getDate());

  if (selectedDate > minAgeDate) {
    dob.setErrors({ minAge: true });
    return { minAge: true };
  } else if (selectedDate < MinDate) {
    dob.setErrors({ minDate: true });
    return { minDate: true };
  }

  return null;
};
