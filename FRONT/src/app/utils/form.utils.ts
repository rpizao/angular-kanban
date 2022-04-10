import { FormArray, FormGroup } from "@angular/forms";

export class FormUtils {
  static isValid(form: FormGroup): boolean {
    form.markAllAsTouched();
    this.validateAllFields(form);
    form.updateValueAndValidity({ onlySelf: true });
    return form.valid;
  }

  static isInvalid(form: FormGroup): boolean {
    return !FormUtils.isValid(form);
  }

  private static validateAllFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(!control) throw new Error("Campo " + field + " não encontrado no formulário");

      if (control instanceof FormGroup || control instanceof FormArray) {
          this.validateAllFields(control);
      }
      control.updateValueAndValidity({ onlySelf: true });
    });
  }
}
