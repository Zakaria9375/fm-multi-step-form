import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CurrencyPipe, DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { Step4Component } from './step4.component';
import {StepperHandlingService} from "../../common/services/stepper/stepper-handling.service";
import {plans} from "../../common/model/plans";
import {addOns} from "../../common/model/addOns";

describe('Component(Step-4 Component)', () => {
  let component: Step4Component;
  let fixture: ComponentFixture<Step4Component>;
  let stepperService: jasmine.SpyObj<StepperHandlingService>;
  let fb: FormBuilder;

  beforeEach(async () => {
    const stepperServiceSpy = jasmine.createSpyObj('StepperHandlingService', ['goToStep']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CurrencyPipe,
        DecimalPipe,
        JsonPipe,
        NgClass,
        Step4Component
      ],
      providers: [
        { provide: StepperHandlingService, useValue: stepperServiceSpy },
        FormBuilder
      ],
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4Component);
    component = fixture.componentInstance;
    stepperService = TestBed.inject(StepperHandlingService) as jasmine.SpyObj<StepperHandlingService>;

    // Initialize the form
    component.formChecking = fb.group({
      planSelection: fb.group({
        plan: [plans[0].id],
        isYearly: [false],
      }),
      addOns: fb.group({
        onlineService: [true],
        largerStorage: [false],
        customizableProfile: [true],
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly for monthly plan', () => {
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(plans[0].priceMonthly + addOns[0].priceMonthly + addOns[2].priceMonthly);
  });

  it('should calculate total price correctly for yearly plan', () => {
    component.formChecking.get('planSelection')?.get('isYearly')?.setValue(true);
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(plans[0].priceYearly + addOns[0].priceYearly + addOns[2].priceYearly);
  });

});
