import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { plans } from '../../../common/model/plans';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('Component(Plan Component)', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CurrencyPipe,
        NgClass,
        PlanComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register onChange function', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
  });

  it('should register onTouch function', () => {
    const fn = jasmine.createSpy('onTouch');
    component.registerOnTouched(fn);
    expect(component['onTouch']).toBe(fn);
  });

  it('should write value and select plan', () => {
    const planId = plans[0].id;
    component.writeValue(planId);
    expect(component.selectedPlan).toEqual(plans[0]);
  });

  it('should reset selected plan when writeValue is called with null', () => {
    component.writeValue(null);
    expect(component.selectedPlan).toBeNull();
  });

  it('should call onChange and onTouch when a plan is selected', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchSpy = jasmine.createSpy('onTouch');
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchSpy);

    component.onPlanSelect(plans[0]);

    expect(onChangeSpy).toHaveBeenCalledWith(plans[0].id);
    expect(onTouchSpy).toHaveBeenCalled();
  });
});
