import { TestBed } from '@angular/core/testing';

import { StepperHandlingService } from './stepper-handling.service';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {FormService} from "../form/form.service";

describe('Service(Stepper Service)', () => {
  let service: StepperHandlingService;
  let formServiceSpy: jasmine.SpyObj<FormService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FormService', ['createForm']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        StepperHandlingService,
        {provide: FormService, useValue: spy},
        FormBuilder,
      ]
    });

    formServiceSpy = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
    formServiceSpy.createForm.and.returnValue(new FormBuilder().group({
      personalInfo: new FormBuilder().group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      }),
      planSelection: new FormBuilder().group({
        plan: [null, Validators.required],
        isYearly: false,
      }),
      addOns: new FormBuilder().group({
        onlineService: false,
        largerStorage: false,
        customizableProfile: false,
      }),
    }));
    service = TestBed.inject(StepperHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with step 1', () => {
      service.currentStep$.subscribe(step => {
        expect(step).toBe(1);
      });
    });
  });

  describe('step navigation', () => {
    it('should go to specified step if current step is valid', (done) => {
      const form = service.form;
      form.get('personalInfo.name')?.setValue('John Doe');
      form.get('personalInfo.email')?.setValue('test@example.com');
      form.get('personalInfo.phone')?.setValue('+1234567890');

      service.goToStep(2);
      service.currentStep$.subscribe(step => {
        expect(step).toBe(2);
        done();
      });
    });

    it('should not go to specified step if current step is invalid', (done) => {
      service.goToStep(2);
      service.currentStep$.subscribe(step => {
        expect(step).toBe(1);  // Initial step should remain
        done();
      });
    });

    it('should go to the next step if current step is valid', (done) => {
      const form = service.form;
      form.get('personalInfo.name')?.setValue('John Doe');
      form.get('personalInfo.email')?.setValue('test@example.com');
      form.get('personalInfo.phone')?.setValue('+1234567890');

      service.nextStep();
      service.currentStep$.subscribe(step => {
        expect(step).toBe(2);
        done();
      });
    });

    it('should not go to the next step if current step is invalid', (done) => {
      service.nextStep();
      service.currentStep$.subscribe(step => {
        expect(step).toBe(1);
        done();
      });
    });
  });

  describe('validation handling', () => {

    it('should mark form group controls as touched indirectly through step navigation', () => {
      const form = service.form;
      const personalInfoGroup = form.get('personalInfo') as FormGroup;

      service.nextStep();  // Attempt to go to next step, which should mark controls as touched
      expect(personalInfoGroup?.get('name')?.touched).toBeTrue();
      expect(personalInfoGroup?.get('email')?.touched).toBeTrue();
      expect(personalInfoGroup?.get('phone')?.touched).toBeTrue();
    });
  });
});
