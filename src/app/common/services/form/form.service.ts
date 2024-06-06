import { Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private fb: NonNullableFormBuilder) {}
  createForm(): FormGroup {
    return this.fb.group({
      personalInfo: this.fb.group({
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z\s]+$/),
            Validators.minLength(4),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      }),
      planSelection: this.fb.group({
        plan: [null, [Validators.required]],
        isYearly: false,
      }),
      addOns: this.fb.group({
        onlineService: false,
        largerStorage: false,
        customizableProfile: false,
      }),
    });
  }

}
