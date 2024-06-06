import { Component, forwardRef, Input } from '@angular/core';
import { plans } from '../../../common/model/plans';
import { CurrencyPipe, NgClass } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Plan } from '../../../common/model/plan.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const PLAN_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlanComponent),
  multi: true,
};

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, NgClass],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
  providers: [PLAN_VALUE_ACCESSOR],
  animations: [
    trigger('fade-down', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-5px)',
        }),
        animate(300),
      ]),
    ]),
    trigger('fade-up', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(5px)',
        }),
        animate(300),
      ]),
    ]),
  ],
})
export class PlanComponent implements ControlValueAccessor {
  @Input() isYearly!: boolean;
  selectedPlan!: Plan | null;

  plans = plans;
  onPlanSelect(plan: Plan) {
    this.selectedPlan = plan;
    this.onChange(plan.id);
    this.onTouch();
  }

  private onChange!: Function;
  private onTouch!: Function;

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(planId: number | null) {
    if (planId !== null) {
      const plan = this.plans.find((p) => p.id === planId);
      this.selectedPlan = plan || null;
    } else {
      this.selectedPlan = null;
    }
  }
}
