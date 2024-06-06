import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormService} from "../form/form.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class StepperHandlingService {
  form: FormGroup;

  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStepSubject.asObservable();

  constructor(private formService: FormService) {
    this.form = this.formService.createForm();
  }

  goToStep(step: number) {
    if (this.isCurrentStepValid()) {
      this.currentStepSubject.next(step);
    }
  }

  nextStep() {
    if (this.isCurrentStepValid()) {
      this.currentStepSubject.next(this.currentStepSubject.value + 1);
    }
  }

  prevStep() {
    this.currentStepSubject.next(this.currentStepSubject.value - 1);
  }
  private isCurrentStepValid(): boolean {
    let currentGroup: FormGroup | null = null;

    switch (this.currentStepSubject.value) {
      case 1:
        currentGroup = this.form.get('personalInfo') as FormGroup;
        break;
      case 2:
        currentGroup = this.form.get('planSelection') as FormGroup;
        break;
      case 3:
        currentGroup = this.form.get('addOns') as FormGroup;
        break;
      default:
        return true;
    }

    if (currentGroup && !currentGroup.valid) {
      this.markFormGroupTouched(currentGroup);
      return false;
    }

    return true;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);  // Recursively mark nested form groups
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
