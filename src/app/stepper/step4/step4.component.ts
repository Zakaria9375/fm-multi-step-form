import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, ReactiveFormsModule} from "@angular/forms";
import {StepperHandlingService} from "../../common/services/stepper/stepper-handling.service";
import {CurrencyPipe, DecimalPipe, NgClass} from "@angular/common";
import {plans} from "../../common/model/plans";
import {addOns} from "../../common/model/addOns";
import {Plan} from "../../common/model/plan.interface";
import {AddOn} from "../../common/model/addOn.interface";

@Component({
  selector: 'app-step4',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, DecimalPipe, NgClass],
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.css',
})
export class Step4Component implements OnInit {
  @Input() formChecking!: FormGroup;
  totalPrice: number = 0;
  plans = plans;
  addOns = addOns;
  selectedPlan: Plan | undefined;
  isYearly: boolean = false;
  selectedAddOnsKeys: { [key: string]: boolean } = {};
  selectedAddOns: AddOn[] = [];

  constructor(private stepperService: StepperHandlingService) {}

  calculateTotalPrice() {
    const formValue = this.formChecking.value;
    const selectedPlanId = formValue.planSelection.plan;
    this.isYearly = formValue.planSelection.isYearly;
    this.selectedAddOnsKeys = formValue.addOns;
    this.selectedAddOns = Object.keys(this.selectedAddOnsKeys)
      .filter((key) => this.selectedAddOnsKeys[key])
      .map((key) => this.addOns.find((addOn) => addOn.name === key)!)
      .filter(Boolean);

    this.selectedPlan = this.plans.find((p) => p.id === selectedPlanId);
    if (!this.selectedPlan) {
      return;
    }

    const planPrice = this.isYearly
      ? this.selectedPlan.priceYearly
      : this.selectedPlan.priceMonthly;

    const addOnsPrice = this.addOns.reduce((total, addOn) => {
      if (this.selectedAddOnsKeys[addOn.name]) {
        return total + (this.isYearly ? addOn.priceYearly : addOn.priceMonthly);
      }
      return total;
    }, 0);

    this.totalPrice = planPrice + addOnsPrice;
  }

  ngOnInit(): void {
    this.calculateTotalPrice();
  }

  getAddOnsPrice(addOn: AddOn): string {
    const price = this.isYearly ? addOn.priceYearly : addOn.priceMonthly;
    return `$${price}/${this.isYearly ? 'yr' : 'mo'}`;
  }

  goChange(): void {
    this.stepperService.goToStep(2);
  }

  planType(): string {
    return this.isYearly ? 'yearly' : 'monthly';
  }

  perType(): string {
    return this.isYearly ? 'yr' : 'mo';
  }
}
