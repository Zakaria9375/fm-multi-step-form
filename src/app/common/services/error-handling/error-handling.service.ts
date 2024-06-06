import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private errorIdMap: { [key: string]: string } = {
    required: 'This field is required.',
    textPattern: 'Only letters are allowed.',
    phonePattern: 'Only numbers are allowed.',
    minlength: 'Minimum length is ',
    email: 'Please enter a valid email.',
  };

  getErrorMessage(control: FormControl<any> | undefined, field: string): { id: string, message: string }[] {
    //conditions evaluates to be true if one of those is true
    if (!control || !control.errors || !control.touched) {
      return [];
    }
    return Object.keys(control.errors).map(errorKey => {
      let message = this.errorIdMap[errorKey] || 'Invalid input';
      if(errorKey === 'pattern') {
        if (field === 'phone') {
          message = this.errorIdMap['phonePattern'];
        } else {
          message = this.errorIdMap['textPattern'];
        }
      }
      else if (errorKey === 'minlength') {
        message += `${control.errors?.[errorKey].requiredLength} characters.`;
      }

      return {
        id: `${field}Err-${errorKey}`,
        message: message
      };
    });
  }

  getAriaDescribedBy(control: FormControl | null, field: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    return Object.keys(control.errors)
      .map((key) => `${field}Err-${key}`)
      .join(' ');
  }
}
