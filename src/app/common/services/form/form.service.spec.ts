import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('Service(Form Service)', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormService, FormBuilder]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method(createForm)', () => {
    it('should create a form with the expected structure', () => {
      const form = service.createForm();
      expect(form.get('personalInfo')).toBeTruthy();
      expect(form.get('planSelection')).toBeTruthy();
      expect(form.get('addOns')).toBeTruthy();
    });

    it('should create a form with default values', () => {
      const form = service.createForm();
      expect(form.get('personalInfo.name')?.value).toBe('');
      expect(form.get('personalInfo.email')?.value).toBe('');
      expect(form.get('personalInfo.phone')?.value).toBe('');
      expect(form.get('planSelection.plan')?.value).toBe(null);
      expect(form.get('planSelection.isYearly')?.value).toBe(false);
      expect(form.get('addOns.onlineService')?.value).toBe(false);
      expect(form.get('addOns.largerStorage')?.value).toBe(false);
      expect(form.get('addOns.customizableProfile')?.value).toBe(false);
    });

    it('should have required validators on the personalInfo group', () => {
      const form = service.createForm();
      const personalInfo = form.get('personalInfo');

      personalInfo?.get('name')?.setValue('');
      expect(personalInfo?.get('name')?.valid).toBeFalsy();
      personalInfo?.get('name')?.setValue('John');
      expect(personalInfo?.get('name')?.valid).toBeTruthy();

      personalInfo?.get('email')?.setValue('');
      expect(personalInfo?.get('email')?.valid).toBeFalsy();
      personalInfo?.get('email')?.setValue('test@example.com');
      expect(personalInfo?.get('email')?.valid).toBeTruthy();

      personalInfo?.get('phone')?.setValue('');
      expect(personalInfo?.get('phone')?.valid).toBeFalsy();
      personalInfo?.get('phone')?.setValue('+1234567890');
      expect(personalInfo?.get('phone')?.valid).toBeTruthy();
    });

    it('should have required validators on the planSelection group', () => {
      const form = service.createForm();
      const planSelection = form.get('planSelection');

      planSelection?.get('plan')?.setValue(null);
      expect(planSelection?.get('plan')?.valid).toBeFalsy();
      planSelection?.get('plan')?.setValue('2');
      expect(planSelection?.get('plan')?.valid).toBeTruthy();
    });
  });
});
