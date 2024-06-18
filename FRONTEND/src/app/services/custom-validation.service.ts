import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: boolean } | null> => {
      return new Promise((resolve) => {
        if (!control.value) {
          resolve(null);
        }
  
        const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numericRegex = /[0-9]/;
  
        const hasSpecialCharacter = specialCharacterRegex.test(control.value);
        const hasUppercase = uppercaseRegex.test(control.value);
        const hasLowercase = lowercaseRegex.test(control.value);
        const hasNumeric = numericRegex.test(control.value);
        const isLengthValid = control.value.length >= 8;
  
        const isValid = hasSpecialCharacter && hasUppercase && hasLowercase && hasNumeric && isLengthValid;
        resolve(isValid ? null : { invalidPassword: true });
      });
    };
  }

  
}
