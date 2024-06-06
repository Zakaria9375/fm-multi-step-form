import { TestBed } from '@angular/core/testing';
import { ErrorHandlingService } from './error-handling.service';
import {FormControl, Validators} from "@angular/forms";

describe('Service(Error Handling Service)', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method(getErrorMessage) should return an empty array', () => {
    it('should return an empty array. because control is undefined', () => {
      const result = service.getErrorMessage(undefined, '');
      expect(result).toEqual([]);
    });

    it('should return an empty array. because no validator', () => {
      const control = new FormControl('')
      const result = service.getErrorMessage(control, 'test');
      expect(result).toEqual([]);
    });

    it('should return an empty array. because control not touched', () => {
      const control = new FormControl('', {validators: [Validators.required]})
      const result = service.getErrorMessage(control, 'test');
      expect(result).toEqual([]);
    });
  })

  describe('method(getErrorMessage) should return error message', () => {
    it('should return required error message', () => {
      const control = new FormControl('', {validators: [Validators.required]});
      //if you comment the following function test will fail as it expect to be touched
      control.markAsTouched();
      const result = service.getErrorMessage(control, 'testField');
      expect(result).toEqual([{id: 'testFieldErr-required', message: 'This field is required.'}]);
    });

  })

  describe('method(getAriaDescribedBy) should return an empty string', () => {
    it('should return an empty string if control is undefined', () => {
      const result = service.getAriaDescribedBy(null, 'testField');
      expect(result).toBe('');
    });
    it('should return an empty string if control has no errors or is untouched', () => {
      const control = new FormControl('', {validators: Validators.required});
      const result = service.getAriaDescribedBy(control, 'testField');
      expect(result).toBe('');
    });
  })

  describe('method(getAriaDescribedBy) should return a string', () => {
    it('should return describedby string for a single error', () => {
      const control = new FormControl('', {validators: [Validators.required]});
      control.markAsTouched();
      control.updateValueAndValidity();
      const result = service.getAriaDescribedBy(control, 'testField');
      expect(result).toBe('testFieldErr-required');
    });
    it('should return describedby string for multiple errors', () => {
      const control = new FormControl('1', {validators: [Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(2)]});
      control.markAsTouched();
      control.updateValueAndValidity();
      const result = service.getAriaDescribedBy(control, 'testField');
      expect(result).toBe('testFieldErr-pattern testFieldErr-minlength');
    });
  })
});
