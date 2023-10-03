import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// Función de validación personalizada para comparar emails
export function EmailMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const emailControl = formGroup.get(controlName);
      const confirmEmailControl = formGroup.get(matchingControlName);
  
      if (!emailControl || !confirmEmailControl) {
        return null;
      }
  
      if (emailControl.value === confirmEmailControl.value) {
        confirmEmailControl.setErrors(null); // Las direcciones de correo electrónico coinciden, elimina los errores
      } else {
        confirmEmailControl.setErrors({ emailMismatch: true }); // Las direcciones de correo electrónico no coinciden
      }
  
      return null; // Retornar null para la validación global del FormGroup
    };
  }
  
  // Función de validación personalizada para comparar contraseñas
  export function PasswordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const passwordControl = formGroup.get(controlName);
      const confirmPasswordControl = formGroup.get(matchingControlName);
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      if (passwordControl.value === confirmPasswordControl.value) {
        confirmPasswordControl.setErrors(null); // Las contraseñas coinciden, elimina los errores
      } else {
        confirmPasswordControl.setErrors({ passwordMismatch: true }); // Las contraseñas no coinciden
      }
  
      return null; // Retornar null para la validación global del FormGroup
    };
  }